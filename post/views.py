from django.shortcuts import render
from django.http import HttpResponse
import json
from django.contrib.auth.models import User
from django.contrib.auth import authenticate,login,logout
from .models import Image,tag,comment,post,group,subgroup
from django.core import serializers
from django.http import JsonResponse


def base(request):
    posts=post.objects.all()[0:6]
    latest_p=post.objects.all()[0:5]
    latest_t=tag.objects.all()[0:5]
    groups=group.objects.all()
    return render(request,"post/index.html",{'type':'all','posts':posts,'latest_p':latest_p,'latest_t':latest_t,'gp':groups,'a_p':1})


def contact_us(request):
    latest_p=post.objects.all()[0:5]
    latest_t=tag.objects.all()[0:5]
    groups=group.objects.all()
    return render(request,"post/contact.html",{'latest_p':latest_p,'gp':groups,'latest_t':latest_t})

    
def about_us(request):
    latest_p=post.objects.all()[0:5]
    latest_t=tag.objects.all()[0:5]
    groups=group.objects.all()
    return render(request,"post/about.html",{'latest_p':latest_p,'gp':groups,'latest_t':latest_t})

def register(request):
    latest_t=tag.objects.all()[0:5]
    latest_p=post.objects.all()[0:5]
    groups=group.objects.all()
    return render(request,"post/register.html",{'latest_p':latest_p,'gp':groups,'latest_t':latest_t})


def like_post(request):
    if request.method =="POST":
        posts=post.objects.filter(id=request.POST["name"])
        p=posts[0]
        x=p.like
        p.like=x+1
        p.save()
        return HttpResponse(json.dumps({'result': x+1}), content_type='application/json')
    else:
        return HttpResponse(json.dumps({'result': "nothing"}), content_type='application/json')



def dislike_post(request):
    if request.method =="POST":
        posts=post.objects.filter(id=request.POST["name"])
        p=posts[0]
        x=p.dislike
        p.dislike=x+1
        p.save()
        return HttpResponse(json.dumps({'result': x+1}), content_type='application/json')
    else:
        return HttpResponse(json.dumps({'result': "nothing"}), content_type='application/json')


def like_cm(request):
    if request.method =="POST":
        cms=comment.objects.filter(id=request.POST["name"])
        p=cms[0]
        x=p.like
        p.like=x+1
        p.save()
        return HttpResponse(json.dumps({'result': x+1}), content_type='application/json')
    else:
        return HttpResponse(json.dumps({'result': "nothing"}), content_type='application/json')



def dislike_cm(request):
    if request.method =="POST":
        cms=comment.objects.filter(id=request.POST["name"])
        p=cms[0]
        x=p.dislike
        p.dislike=x+1
        p.save()
        return HttpResponse(json.dumps({'result': x+1}), content_type='application/json')
    else:
        return HttpResponse(json.dumps({'result': "nothing"}), content_type='application/json')




def group_posts(request ,group_id=1):
    gp=subgroup.objects.filter(id=group_id)
    posts=post.objects.filter(groups__in=gp)[0:6]
    latest_p=post.objects.all()[0:5]
    latest_t=tag.objects.all()[0:5]
    groups=group.objects.all()
    return render(request,"post/index.html",{'type':"gp"+group_id,'posts':posts,'latest_p':latest_p,'gp':groups,'latest_t':latest_t,'a_p':1})


def get_post(request ,post_id=1):
    p=post.objects.filter(id=post_id)[0]
    x=p.seen
    p.seen=x+1
    p.save()
    latest_t=tag.objects.all()[0:5]
    latest_p=post.objects.all()[0:5]
    groups=group.objects.all()
    return render(request,"post/single.html",{'post':p,'latest_p':latest_p,'gp':groups,'latest_t':latest_t})

def send_comment(request):
    if request.method=="POST":
        c=comment.objects.create(name=request.POST["name"],email=request.POST["email"],text=request.POST["text"])
        c.save()
        p=post.objects.filter(id=request.POST["id"])[0]
        p.comments.add(c)
        return HttpResponse(json.dumps({'result': True}), content_type='application/json')

def reg_user(request):
    if request.method == "POST":
        u=User.objects.filter(username=request.POST["username"])
        if(len(u)>0):
            return HttpResponse(json.dumps({'reg': "false"}), content_type='application/json')
        user=User.objects.create_user(request.POST["username"], request.POST["email"],request.POST["password"])
        user.first_name=request.POST["f_name"]
        user.last_name=request.POST["l_name"]
        user.save()
        return HttpResponse(json.dumps({'reg': "true"}), content_type='application/json')


def login_user(request):
    name="wrong"
    if request.method == "POST":
        users=User.objects.filter(username=request.POST["username"])
        if(len(users)>0):
            user=users[0]
            user2 = authenticate(username=user.username, password=request.POST["password"])
            if user2 is not None:
                if user2.is_active:
                    login(request,user2)
                    user3=User.objects.filter(username=request.POST["username"])[0]
                    return HttpResponse(json.dumps({'reg': "true",'name':user3.username}), content_type='application/json')
            else:
                return HttpResponse(json.dumps({'reg': "false"}), content_type='application/json')
        else:
            return HttpResponse(json.dumps({'reg': "false"}), content_type='application/json')


def get_pages(request):
    if(request.POST["name"]=="all"):
        posts=post.objects.all()
        i=int(len(posts)/6)+1
    elif (request.POST["name"]=="gp"):
        gp=subgroup.objects.filter(id=request.POST["type_id"])
        posts=post.objects.filter(groups__in=gp)
        i=int(len(posts)/6)+1
    return HttpResponse(json.dumps({'result':i}), content_type='application/json')


def posts_page(request,post_page=1):
    posts=post.objects.all()[(int(post_page)-1)*6:(int(post_page))*6]
    latest_p=post.objects.all()[0:5]
    latest_t=tag.objects.all()[0:5]
    groups=group.objects.all()
    return render(request,"post/index.html",{'type':'all','posts':posts,'latest_p':latest_p,'latest_t':latest_t,'gp':groups,'a_p':post_page})



def posts_page2(request,gp_id=1,post_page=1):
    gp=subgroup.objects.filter(id=gp_id)
    posts=post.objects.filter(groups__in=gp)[(int(post_page)-1)*6:(int(post_page))*6]
    latest_p=post.objects.all()[0:5]
    latest_t=tag.objects.all()[0:5]
    groups=group.objects.all()
    return render(request,"post/index.html",{'type':'all','posts':posts,'latest_p':latest_p,'latest_t':latest_t,'gp':groups,'a_p':post_page})

def search_post(request):
    # posts=post.objects.filter(title__contains=request.POST["name"])
    posts=post.objects.all()
    latest_p=post.objects.all()[0:5]
    latest_t=tag.objects.all()[0:5]
    groups=group.objects.all()
    return render(request,"post/subpost.html",{'type':'all','posts':posts,'latest_p':latest_p,'latest_t':latest_t,'gp':groups,'a_p':1})



def posts_tag(request,posts_tag=1):
    tgs=tag.objects.filter(id=posts_tag)
    posts=post.objects.filter(tags__in=tgs)
    latest_p=post.objects.all()[0:5]
    latest_t=tag.objects.all()[0:5]
    groups=group.objects.all()
    return render(request,"post/subpost.html",{'type':'all','posts':posts,'latest_p':latest_p,'latest_t':latest_t,'gp':groups,'a_p':1})
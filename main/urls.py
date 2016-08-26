"""main URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.9/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.contrib import admin
from post import views as p_view

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^home/', p_view.base),
    url(r'^reg_user/', p_view.reg_user),
    url(r'^get_pages/', p_view.get_pages),
    url(r'^login_user/', p_view.login_user),
    url(r'^contact_us/', p_view.contact_us),
    url(r'^about_us/', p_view.about_us),
    url(r'^register/', p_view.register),
    url(r'^search_post/', p_view.search_post),
    url(r'^like_post/', p_view.like_post, name="like_post"),
    url(r'^dislike_post/', p_view.dislike_post, name="dislike_post"),
    url(r'^like_cm/', p_view.like_cm, name="like_cm"),
    url(r'^dislike_cm/', p_view.dislike_cm, name="dislike_cm"),
    url(r'^group_posts/(?P<group_id>\d+)/', p_view.group_posts),
    url(r'^single/(?P<post_id>\d+)/', p_view.get_post),
    url(r'^send_comment/', p_view.send_comment),
    url(r'^all/page/(?P<post_page>\d+)/', p_view.posts_page),
    url(r'^tag/(?P<posts_tag>\d+)/', p_view.posts_tag),
    url(r'^gp/(?P<gp_id>\d+)/page/(?P<post_page>\d+)/', p_view.posts_page2),
]

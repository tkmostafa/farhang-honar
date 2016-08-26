from django.contrib import admin
from .models import group,subgroup,comment,tag,Image,post


admin.site.register(group)
admin.site.register(subgroup)
admin.site.register(tag)
admin.site.register(comment)
admin.site.register(Image)
admin.site.register(post)

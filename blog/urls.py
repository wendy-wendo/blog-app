from django.urls import path
from . import views

app_name="blog"

urlpatterns = [
    path("", views.blogOverview, name="blog-overview"),
    path('list/<str:author>/', views.blogList, name="blog-list"),
    path('detail/<str:pk>/', views.blogDetail, name="blog-detail"),
    path('create/', views.blogCreate, name="blog-create"),
    path('update/<str:pk>/', views.blogUpdate, name="blog-update"),
    path('delete/<str:pk>/', views.blogDelete, name="blog-delete")
]

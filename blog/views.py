from django.shortcuts import render

from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import PostSerializer

from .models import Post

# Create your views here.
@api_view(['GET'])
def blogOverview(request):
    api_urls = {
        'List': '/blog-list/<str:author>/',
        'Detail View': '/blog/<str:pk>/',
        'Create': '/blog-create/<str:author>/',
        'Update': '/blog-update/<str:pk>/',
        'Delete': '/blog-delete/<str:pk>/'
    }

    return Response(api_urls)

@api_view(['GET'])
def blogList(request, author):
    posts = Post.objects.filter(author=author)
    serializer = PostSerializer(posts, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def blogDetail(request, pk):
    post = Post.objects.get(id=pk)
    serializer = PostSerializer(post, many=False)
    return Response(serializer.data)


@api_view(['POST'])
def blogCreate(request):
    serializer = PostSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)


@api_view(['POST'])
def blogUpdate(request, pk):
    post = Post.objects.get(id=pk)
    serializer = PostSerializer(instance=post, data=request.data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)


@api_view(['DELETE'])
def blogDelete(request, pk):
    post = Post.objects.get(id=pk)
    post.delete()

    return Response("Post successfully deleted.")
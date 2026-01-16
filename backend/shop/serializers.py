from rest_framework import serializers
from .models import Category, Product
from accounts.serializers import UserSerializer

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
    owner = UserSerializer(read_only=True)
    category_details = CategorySerializer(source='category', read_only=True)
    class Meta:
        model = Product
        fields = '__all__'

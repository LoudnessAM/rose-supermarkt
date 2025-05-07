from rest_framework import serializers
from .models import Category, Product, SpecialOffer  # 👈 SpecialOffer hinzufügen

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']

class ProductSerializer(serializers.ModelSerializer):
    category_name = serializers.ReadOnlyField(source='category.name')
    
    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'price', 'image', 'stock', 'category', 'category_name']

class SpecialOfferSerializer(serializers.ModelSerializer):  # 👈 Step 4
    class Meta:
        model = SpecialOffer
        fields = '__all__'

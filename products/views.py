from django.shortcuts import render

from rest_framework import viewsets
from .models import Category, Product, SpecialOffer  # 👈 SpecialOffer hinzufügen
from .serializers import CategorySerializer, ProductSerializer, SpecialOfferSerializer  # 👈 Import ergänzen

class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    def get_queryset(self):
        queryset = Product.objects.all()
        category = self.request.query_params.get('category')
        if category:
            queryset = queryset.filter(category__id=category)
        return queryset

class SpecialOfferViewSet(viewsets.ReadOnlyModelViewSet):  # 👈 Step 5
    queryset = SpecialOffer.objects.filter(active=True)
    serializer_class = SpecialOfferSerializer

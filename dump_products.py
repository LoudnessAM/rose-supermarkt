import json
from django.core.serializers import serialize
from products.models import Product

with open("products.json", "w", encoding="utf-8") as f:
    data = serialize("json", Product.objects.all(), indent=2)
    f.write(data)

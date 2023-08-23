#!/usr/bin/env python3
"""the basics"""
from base_caching import BaseCaching


class BasicCache(BaseCaching):
    """a class that inherits from BaseCaching
    and is a caching system
    """
    def __init__(self):
        super().__init__()

    def put(self, key, item):
        """adds data to the cache"""
        if (key is None or item is None):
            return
        self.cache_data[key] = item

    def get(self, key):
        """gets data from the cache"""
        return (self.cache_data.get(key))

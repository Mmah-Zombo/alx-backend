#!/usr/bin/env python3
"""contains a class that implements LRU caching"""
from base_caching import BaseCaching
from collections import OrderedDict


class MRUCache(BaseCaching):
    """implements the least recently used cache
    replacement policy
    """
    def __init__(self):
        super().__init__()
        self.cache_data = OrderedDict()

    def put(self, key, item):
        """adds data to the cache"""

        if (key is None or item is None):
            return

        if ((len(self.cache_data) + 1) > BaseCaching.MAX_ITEMS):
            ckey, _ = self.cache_data.popitem()
            print(f"DISCARD:", ckey)

        self.cache_data[key] = item
        self.cache_data.move_to_end(key)

    def get(self, key):
        """gets the cache data for a specific key"""
        if key in self.cache_data and key is not None:
            self.cache_data.move_to_end(key)
        return (self.cache_data.get(key))

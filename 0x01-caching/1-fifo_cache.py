#!/usr/bin/env python3
"""contains a class that implements FIFO caching"""
from base_caching import BaseCaching
from collections import OrderedDict


class FIFOCache(BaseCaching):
    """a cahcing system that implements the first in
    first out cache replacement policy
    """
    def __init__(self):
        super().__init__()
        self.cache_data = OrderedDict()

    def put(self, key, item):
        """adds data to the cache"""

        if (key is None or item is None):
            return

        self.cache_data[key] = item

        if (len(self.cache_data) > BaseCaching.MAX_ITEMS):
            ckey, _ = self.cache_data.popitem(False)
            print(f"DISCARD:", ckey)

    def get(self, key):
        """gets the cache data for a specific key"""
        return (self.cache_data.get(key))

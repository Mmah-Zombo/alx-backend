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

    def put(self, key, item):
        """adds data to the cache"""
        cache = self.cache_data
        orderedCache = OrderedDict(cache)

        if (key is None or item is None):
            return
        if (len(cache) > BaseCaching.MAX_ITEMS):
            ckey, _ = orderedCache.popitem(False)
            del cache[ckey]
            print(f"DISCARD:{ckey}")

        self.cache_data[key] = item

    def get(self, key):
        """gets the cache data for a specific key"""
        return (self.cache_data.get(key))

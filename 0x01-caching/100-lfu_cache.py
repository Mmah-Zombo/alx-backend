#!/usr/bin/python3
""" 100-lfu_cache """
from base_caching import BaseCaching


class LFUCache(BaseCaching):
    """implements the least recently used cache
    replacement policy"""
    def __init__(self):
        super().__init__()
        self.freq_count = {}
        self.lfu_counter = 0

    def update_frequency(self, key):
        """updates the frequency"""
        if key in self.freq_count:
            self.freq_count[key] += 1
        else:
            self.freq_count[key] = 1

    def update_lfu_counter(self):
        """update the counter"""
        self.lfu_counter += 1
        return self.lfu_counter

    def update_least_frequent(self):
        """update the least frequently used"""
        min_freq = min(self.freq_count.values())
        least_frequent_keys = [key for key, freq in
                               self.freq_count.items() if freq == min_freq]
        return min(least_frequent_keys, key=lambda key: self.data[key][1])

    def put(self, key, item):
        """adds data to the cache"""
        if key is None or item is None:
            return

        if len(self.cache_data) >= BaseCaching.MAX_ITEMS:
            lfu_key = self.update_least_frequent()
            if self.freq_count[lfu_key] > 1:
                lru_key = min(self.cache_data,
                              key=lambda key: self.data[key][1])
                print("DISCARD:", lru_key)
                self.cache_data.pop(lru_key)
                self.freq_count.pop(lru_key)
            else:
                print("DISCARD:", lfu_key)
                self.cache_data.pop(lfu_key)
                self.freq_count.pop(lfu_key)

        self.cache_data[key] = (item, self.update_lfu_counter())
        self.freq_count[key] = 1

    def get(self, key):
        """gets data from the cache"""
        if key is None or key not in self.cache_data:
            return None

        self.update_frequency(key)
        self.cache_data[key] = (self.cache_data[key][0],
                                self.update_lfu_counter())
        return self.cache_data[key][0]

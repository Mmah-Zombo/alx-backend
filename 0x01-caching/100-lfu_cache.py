#!/usr/bin/python3
""" 100-lfu_cache """
from collections import OrderedDict
from base_caching import BaseCaching


class LFUCache(BaseCaching):
    """ LFUCache inherits from BaseCaching and is a caching system """
    def __init__(self):
        """ Initialize LFUCache """
        super().__init__()
        self.frequency_data = {}
        self.lru_data = OrderedDict()

    def update_frequency(self, key):
        """ Update the frequency of the given key """
        if key in self.frequency_data:
            self.frequency_data[key] += 1
        else:
            self.frequency_data[key] = 1

    def update_lru(self, key):
        """ Update the least recently used data """
        if key in self.lru_data:
            del self.lru_data[key]
        self.lru_data[key] = None

    def put(self, key, item):
        """ Add an item to the cache """
        if key is None or item is None:
            return

        if len(self.cache_data) >= self.MAX_ITEMS:
            # Find the least frequency used items
            min_frequency = min(self.frequency_data.values())
            least_frequent_keys = [k for k, v in self.frequency_data.items()
                                   if v == min_frequency]

            if len(least_frequent_keys) > 1:
                # If there are multiple least frequent keys, use LRU
                lru_key = next(iter(self.lru_data))
                least_frequent_keys.remove(lru_key)
                key_to_discard = min(least_frequent_keys,
                                     key=lambda k: self.lru_data[k])
            else:
                key_to_discard = least_frequent_keys[0]

            del self.cache_data[key_to_discard]
            del self.frequency_data[key_to_discard]
            del self.lru_data[key_to_discard]
            print("DISCARD:", key_to_discard)

        self.cache_data[key] = item
        self.update_frequency(key)
        self.update_lru(key)

    def get(self, key):
        """ Get an item from the cache """
        if key is None or key not in self.cache_data:
            return None

        self.update_frequency(key)
        self.update_lru(key)
        return self.cache_data[key]

#!/usr/bin/env python3
"""Simple helper function"""
import csv
import math
from typing import List
from typing import Tuple, Dict


def index_range(page: int, page_size: int) -> Tuple[int, int]:
    """returns a tuple"""
    sIdx = (page - 1) * page_size
    eIdx = sIdx + page_size

    return (sIdx, eIdx)


class Server:
    """Server class to paginate a database of popular baby names.
    """
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        self.__dataset = None

    def dataset(self) -> List[List]:
        """Cached dataset
        """
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]

        return self.__dataset

    def get_page(self, page: int = 1, page_size: int = 10) -> List[List]:
        """gets the page"""
        assert isinstance(page, int) and page > 0
        assert isinstance(page_size, int) and page_size > 0
        data = self.dataset()
        start, end = index_range(page, page_size)
        if (end) > len(data) or start >= len(data):
            return []
        return data[start:end]

    def get_hyper(self, page: int = 1, page_size: int = 10) -> Dict:
        """gets the hyper link - I guess"""
        data = self.get_page(page, page_size)
        total = math.ceil(len(self.dataset()) / page_size)
        nextPage = page + 1 if (page + 1 <= total) else None
        prevPage = page - 1 if (page - 1 > 0) else None
        Hdict = {
            'page_size': page_size,
            'page': page,
            'data': data,
            'next_page': nextPage,
            'prev_page': prevPage,
            'total_pages': total
        }

        return Hdict

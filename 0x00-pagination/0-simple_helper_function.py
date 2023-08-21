#!/usr/bin/env python3
"""Simple helper function"""
from typing import Tuple


def index_range(page: int, page_size: int) -> Tuple[int, int]:
    """returns a tuple"""
    sIdx = (page - 1) * page_size
    eIdx = sIdx + page_size

    return (sIdx, eIdx)

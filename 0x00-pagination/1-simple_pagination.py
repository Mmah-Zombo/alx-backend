#!/usr/bin/env python3
"""Simple helper function"""


def index_range(page: int, page_size: int) -> tuple:
    """returns a tuple"""
    sIdx = (page - 1) * page_size
    eIdx = sIdx + page_size

    return (sIdx, eIdx)

'use client'

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { INITIAL_PAGE } from '@/lib/constants'

interface TablePaginationProps {
  route: string
  currentPage: number
  hasNextPage: boolean
}

export function TablePagination({
  route,
  currentPage,
  hasNextPage,
}: TablePaginationProps) {
  return (
    <Pagination className="border-t border-neutral-200">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={`/dashboard/${route}?page=${currentPage - 1}`}
            disabled={currentPage <= INITIAL_PAGE}
            className="hover:bg-neutral-50 text-neutral-800"
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink className="w-4 h-4  text-neutral-800">
            {currentPage}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            href={`/dashboard/${route}?page=${currentPage + 1}`}
            disabled={!hasNextPage}
            className="hover:bg-neutral-50 rounded-md transition-all text-neutral-800"
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

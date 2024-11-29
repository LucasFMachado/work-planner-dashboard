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
    <Pagination className="table-footer">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={`/dashboard/${route}?page=${currentPage - 1}`}
            disabled={currentPage <= INITIAL_PAGE}
            className="hover:bg-background-secondary hover:text-white transition-all rounded-md"
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink className="w-10 h-10">{currentPage}</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            href={`/dashboard/${route}?page=${currentPage + 1}`}
            disabled={!hasNextPage}
            className="hover:bg-background-secondary hover:text-white transition-all rounded-md"
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

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
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={`/dashboard/${route}?page=${currentPage - 1}`}
            disabled={currentPage <= INITIAL_PAGE}
            className="hover:bg-slate-900"
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink className="w-4 h-4">{currentPage}</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            href={`/dashboard/${route}?page=${currentPage + 1}`}
            disabled={!hasNextPage}
            className="hover:bg-slate-900 rounded-md transition-all"
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

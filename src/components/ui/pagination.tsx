import { ChevronLeft, ChevronRight } from 'lucide-react'
import * as React from 'react'

import { ButtonProps, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const Pagination = ({
  className,
  ...props
}: React.ComponentProps<'nav'> & {
  className?: string
}) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn(
      'mx-auto flex w-full justify-end border-t border-neutral-700 text-neutral-200',
      className,
    )}
    {...props}
  />
)
Pagination.displayName = 'Pagination'

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<'ul'> & {
    className?: string
  }
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn('flex flex-row items-center gap-1', className)}
    {...props}
  />
))
PaginationContent.displayName = 'PaginationContent'

const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<'li'> & {
    className?: string
  }
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn('', className)} {...props} />
))
PaginationItem.displayName = 'PaginationItem'

type PaginationLinkProps = {
  isActive?: boolean
} & Pick<ButtonProps, 'size'> &
  React.ComponentProps<'a'>

const PaginationLink = ({
  className,
  isActive,
  size = 'icon',
  ...props
}: PaginationLinkProps) => (
  <a
    aria-current={isActive ? 'page' : undefined}
    className={cn(
      buttonVariants({
        variant: isActive ? 'outline' : 'ghost',
        size,
      }),
      className,
    )}
    {...props}
  />
)
PaginationLink.displayName = 'PaginationLink'

const PaginationPrevious = ({
  className,
  disabled,
  ...props
}: React.ComponentProps<typeof PaginationLink> & {
  className?: string
  disabled?: boolean
}) => (
  <PaginationLink
    aria-label="Go to previous page"
    size="default"
    className={cn(
      'gap-1 h-10',
      disabled ? 'pointer-events-none opacity-20' : '',
      className,
    )}
    {...props}
  >
    <ChevronLeft className="h-4 w-4" />
  </PaginationLink>
)
PaginationPrevious.displayName = 'PaginationPrevious'

const PaginationNext = ({
  className,
  disabled,
  ...props
}: React.ComponentProps<typeof PaginationLink> & {
  className?: string
  disabled?: boolean
}) => (
  <PaginationLink
    aria-label="Go to next page"
    size="default"
    className={cn(
      'gap-1 h-10',
      disabled ? 'pointer-events-none opacity-20' : '',
      className,
    )}
    {...props}
  >
    <ChevronRight className="h-4 w-4" />
  </PaginationLink>
)
PaginationNext.displayName = 'PaginationNext'

export {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
}

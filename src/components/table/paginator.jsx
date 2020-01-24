import Grid from '@material-ui/core/Grid/Grid';
import { Button } from 'semantic-ui-react';
const BetweenButton = () => <Button content='...' style={{ cursor: 'default' }} />


import React from 'react';
import { Pagination } from 'semantic-ui-react';
import './data-table.scss';

const Paginator = ({ currentPage, onPageChange, range = 3, pageCount, itemCount }) => {
  const renderedPages = [...Array(range * 2 + 1)
    .keys()]
    .map(i => currentPage - range + i)
    .filter(i => i > 0 && i <= pageCount)
    ;

  const showStart = currentPage - range > 1;
  const showEnd = currentPage + range < pageCount;
  const pageStart = (currentPage - 1) * 10 + 1;
  const pageEnd = currentPage * 10 < itemCount ? currentPage * 10 : itemCount;

  const handlePaginationChange = (e, { activePage }) => onPageChange(activePage);

  return (
    <Pagination
      role='navigation'
      aria-label='table page navigator'
      totalPages={pageEnd}
      defaultActivePage={1}
      firstItem={null}
      lastItem={null}
      prevItem={{ content: '<', icon: true }}
      nextItem={{ content: '>', icon: true }}
      ellipsisItem={{ content: '...', icon: true }}
      onPageChange={handlePaginationChange}
    />




    // <Grid container>
    //   <Grid item xs={4}>
    //     <div>Showing {pageStart} to {pageEnd} of {itemCount} entries</div>
    //   </Grid>
    //   <Grid item xs={8} className='pagination'>
    //     <Button.Group compact>
    //       <Button content='<' onClick={() => onPageChange(currentPage - 1)} />
    //       {showStart && (
    //         <>
    //           <Button content={1} onClick={() => onPageChange(1)} />
    //           <BetweenButton />
    //         </>
    //       )}
    //       {renderedPages.map((page, i) => (
    //         <Button
    //           key={`paginatorButton-${i}`}
    //           onClick={() => onPageChange(page)}
    //           content={page}
    //           primary={currentPage === page}
    //         />
    //       ))}
    //       {showEnd && (
    //         <>
    //           <BetweenButton />
    //           <Button content={pageCount} onClick={() => onPageChange(pageCount)} />
    //         </>
    //       )}
    //       <Button content='>' onClick={() => onPageChange(currentPage + 1)} />
    //     </Button.Group>
    //   </Grid>
    // </Grid>
  );
}

export default Paginator;

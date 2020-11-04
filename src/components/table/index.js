import React, {useState} from "react";
import {useTable, usePagination} from 'react-table'
import {useParams} from "react-router-dom";


function Table({data}) {
    const {accountName, repoName} = useParams();
    const [cursor] = useState('pointer');

    const handleClick = (issueID) => {
        window.location = "/issue/" + accountName + "/" + repoName + "/" + issueID;
    };


    const columns = React.useMemo(
        () => [
            {
                Header: 'Issue ID',
                accessor: 'issueID'
            },
            {
                Header: 'Title',
                accessor: 'title'
            },
            {
                Header: 'State',
                accessor: 'state'
            },
        ],
        []
    );

    const {
        headerGroups,
        prepareRow,
        page, // Instead of using 'rows', we'll use page,
        // which has only the rows for the active page
        getTableProps,
        getTableBodyProps,
        canPreviousPage,
        canNextPage,
        pageOptions,
        nextPage,
        previousPage,
        state: {pageIndex},
    } = useTable(
        {
            columns,
            data,
            initialState: {pageIndex: 0, pageSize: 10},
        },
        usePagination
    );

    return (
        <>
            <table className="table table-hover" {...getTableProps()}>
                <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th scope="col" {...column.getHeaderProps()}>
                                {column.render('Header')}
                            </th>
                        ))}
                    </tr>
                ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                {page.map((row, i) => {
                    prepareRow(row)
                    //console.log(row.values.issueID);
                    return (

                        <tr className="table-active" {...row.getRowProps()} onClick={() => handleClick(row.original.issueID)} style={{ cursor: cursor }}>
                            {row.cells.map(cell => {
                                if(cell.column.id === 'state'){
                                    return <td {...cell.getCellProps()}>{cell.value === 'closed' ?
                                        <span className="badge badge-pill badge-danger">Closed</span> :
                                        <span className="badge badge-pill badge-success">Open</span>
                                    }</td>
                                }
                                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                            })}
                        </tr>
                    )
                })}
                </tbody>
            </table>


            <ul className="pagination">
                <li className={"page-item" + (!canPreviousPage ? " disabled" : "")}>
                    <a className="page-link" href="#0" onClick={() => previousPage()}>&laquo;</a>
                </li>
                <li className={"page-item" + (!canNextPage ? " disabled" : "")}>
                    <a className="page-link" href="#0" onClick={() => nextPage()}>&raquo;</a>
                </li>
            </ul>
            Page{' '} {pageIndex + 1} of {pageOptions.length}


        </>
    );
}

export default Table;
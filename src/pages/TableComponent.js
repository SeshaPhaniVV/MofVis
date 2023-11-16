import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { ButtonBase } from '@mui/material';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  color: theme.palette.common.black,
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:nth-of-type(even)': {
    backgroundColor: theme.palette.common.white,
  },
}));

const StyledTableHeadCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: '#5D8AA8', // light green color for heading
  color: theme.palette.common.black,
  fontWeight: 'bold',
}));

function createData(name, void_fraction, surface_area_m2cm3, surface_area_m2g, pld, lcd) {
  return {
    name,
    void_fraction,
    surface_area_m2cm3,
    surface_area_m2g,
    pld,
    lcd,
  };
}

const customData0 = require('./../json_data/hMOF-0.json');
var customData1 = require('./../json_data/hMOF-1.json');
var customData2 = require('./../json_data/hMOF-2.json');
var customData3 = require('./../json_data/hMOF-3.json');
var customData4 = require('./../json_data/hMOF-4.json');
var customData5 = require('./../json_data/hMOF-5.json');
var customData6 = require('./../json_data/hMOF-6.json');
var customData7 = require('./../json_data/hMOF-7.json');
var customData8 = require('./../json_data/hMOF-8.json');
var customData9 = require('./../json_data/hMOF-9.json');
var customData10 = require('./../json_data/hMOF-10.json');
var customData11 = require('./../json_data/hMOF-11.json');
var customData12 = require('./../json_data/hMOF-12.json');



let originalRows = [];
originalRows.push(
  createData(
    customData0.name,
    customData0.void_fraction,
    customData0.surface_area_m2cm3,
    customData0.surface_area_m2g,
    customData0.pld,
    customData0.lcd,
  ),
);
originalRows.push(
  createData(
    customData1.name,
    customData1.void_fraction,
    customData1.surface_area_m2cm3,
    customData1.surface_area_m2g,
    customData1.pld,
    customData1.lcd,
  ),
);
originalRows.push(
  createData(
    customData2.name,
    customData2.void_fraction,
    customData2.surface_area_m2cm3,
    customData2.surface_area_m2g,
    customData2.pld,
    customData2.lcd,
  ),
);
originalRows.push(
  createData(
    customData3.name,
    customData3.void_fraction,
    customData3.surface_area_m2cm3,
    customData3.surface_area_m2g,
    customData3.pld,
    customData3.lcd,
  ),
);
originalRows.push(
  createData(
    customData4.name,
    customData4.void_fraction,
    customData4.surface_area_m2cm3,
    customData4.surface_area_m2g,
    customData4.pld,
    customData4.lcd,
  ),
);
originalRows.push(
  createData(
    customData5.name,
    customData5.void_fraction,
    customData5.surface_area_m2cm3,
    customData5.surface_area_m2g,
    customData5.pld,
    customData5.lcd,
  ),
);
originalRows.push(
  createData(
    customData6.name,
    customData6.void_fraction,
    customData6.surface_area_m2cm3,
    customData6.surface_area_m2g,
    customData6.pld,
    customData6.lcd,
  ),
);
originalRows.push(
  createData(
    customData7.name,
    customData7.void_fraction,
    customData7.surface_area_m2cm3,
    customData7.surface_area_m2g,
    customData7.pld,
    customData7.lcd,
  ),
);
originalRows.push(
  createData(
    customData8.name,
    customData8.void_fraction,
    customData8.surface_area_m2cm3,
    customData8.surface_area_m2g,
    customData8.pld,
    customData8.lcd,
  ),
);
originalRows.push(
  createData(
    customData9.name,
    customData9.void_fraction,
    customData9.surface_area_m2cm3,
    customData9.surface_area_m2g,
    customData9.pld,
    customData9.lcd,
  ),
);

function descendingComparator(a, b, orderBy) {
  if (!a.hasOwnProperty(orderBy) || !b.hasOwnProperty(orderBy)) {
    return 0;
  }

  if (typeof a[orderBy] === 'number' && typeof b[orderBy] === 'number') {
    return b[orderBy] - a[orderBy];
  }

  if (typeof a[orderBy] === 'string' && typeof b[orderBy] === 'string') {
    return a[orderBy].localeCompare(b[orderBy]);
  }

  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
  { id: 'void_fraction', numeric: true, disablePadding: false, label: 'Void Fraction' },
  { id: 'surface_area_m2cm3', numeric: true, disablePadding: false, label: 'ASA [m²/cm³]' },
  { id: 'surface_area_m2g', numeric: true, disablePadding: false, label: 'ASA [m²/g]' },
  { id: 'pld', numeric: true, disablePadding: false, label: 'PLD [Å]' },
  { id: 'lcd', numeric: true, disablePadding: false, label: 'LCD [Å]' },
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <StyledTableHeadCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </StyledTableHeadCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
};

function EnhancedTableToolbar(props) {
  const { searched, onSearchChange, onCancelSearch } = props;

  return (
    <Toolbar>
      <TextField
        id="search-bar"
        value={searched}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search by name"
        variant="outlined"
        size="small"
        autoComplete="off"
        InputProps={{
          form: {
            autocomplete: 'off',
          },
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          endAdornment: searched && (
            <InputAdornment position="end">
              <IconButton aria-label="clear search" onClick={onCancelSearch} edge="end" size="small">
                <ClearIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{ mr: 15 }} // Adjust spacing as needed
      />
      <Tooltip title="Filter Feature Available Soon">
        <IconButton>
          <FilterListIcon />
        </IconButton>
      </Tooltip>
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  searched: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  onCancelSearch: PropTypes.func.isRequired,
};

export default function EnhancedTable({ setSelectedMof }) {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('void_fraction');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [searched, setSearched] = React.useState('');
  const [rows, setRows] = React.useState(originalRows);

  const requestSearch = (searchedVal) => {
    setSearched(searchedVal);
    const lowercasedValue = searchedVal.toLowerCase();
    const filteredData = originalRows.filter((row) => row.name.toLowerCase().includes(lowercasedValue));
    const sortedData = stableSort(filteredData, getComparator(order, orderBy));
    setRows(sortedData);
  };

  const handleSearchChange = (searchVal) => {
    setSearched(searchVal);
    const sortedData = stableSort(originalRows, getComparator(order, orderBy));
    setRows(sortedData);
  };

  const cancelSearch = () => {
    setSearched('');
    setRows(originalRows); // Reset to original rows
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);

    const sortedData = stableSort(rows, getComparator(isAsc ? 'desc' : 'asc', property));
    setRows(sortedData);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const handleNameClick = (name) => {
    console.log({ name });
    setSelectedMof(name);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar onCancelSearch={cancelSearch} onSearchChange={requestSearch} searched={searched} />
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={dense ? 'small' : 'medium'}>
            <EnhancedTableHead onRequestSort={handleRequestSort} order={order} orderBy={orderBy} />
            <TableBody>
              {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                const isItemSelected = isSelected(row.name); // Ensure that 'isSelected' checks the correct identifier
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.name)} // Make sure 'handleClick' is using the correct identifier
                    // role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.name} // Ensure that 'key' is unique and consistent
                    selected={isItemSelected}
                    sx={{ cursor: 'pointer' }}
                  >
                    <StyledTableCell
                      id={labelId}
                      scope="row"
                      sx={{ cursor: 'pointer', textDecoration: 'underline', color: 'blue' }}
                    >
                      <ButtonBase
                        onClick={() => handleNameClick(row.name)}
                        sx={{ width: '100%', justifyContent: 'left' }}
                      >
                        {row.name}
                      </ButtonBase>
                    </StyledTableCell>
                    <StyledTableCell align="right">{row.void_fraction}</StyledTableCell>
                    <StyledTableCell align="right">{row.surface_area_m2cm3}</StyledTableCell>
                    <StyledTableCell align="right">{row.surface_area_m2g}</StyledTableCell>
                    <StyledTableCell align="right">{row.pld}</StyledTableCell>
                    <StyledTableCell align="right">{row.lcd}</StyledTableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      {/* <FormControlLabel control={<Switch checked={dense} onChange={handleChangeDense} />} label="Dense padding" /> */}
    </Box>
  );
}

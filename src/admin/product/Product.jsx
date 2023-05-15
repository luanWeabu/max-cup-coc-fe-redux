import React, { useMemo } from "react";
import { useState } from "react";
import {
  Button,
  IconButton,
  InputBase,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import ProductForm from "./ProductForm";
import productService from "../services/ProductService";
import DeleteIcon from "@mui/icons-material/Delete";
import SettingsIcon from "@mui/icons-material/Settings";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProductById,
  setCurrentProductId,
  updateProductById,
} from "../redux/product/productSlice";
import { styled, alpha } from "@mui/material/styles";
import { selectCategoryById } from "../redux/category/categorySlice";

//action Khi click vào Search
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    //vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function Product() {
  // Để là state để làm gì?
  // products lấy ra list product và setProduct thay đổi product đó
  // product ở đây được hiển thị giá trị tại ProductService.getAllProduct() tại đây nó sẽ hiển thị các giá trị product
  // Cú pháp này là cú pháp sử dụng tính năng của JS (ES6): structure | destructure | DESTRUCTURING
  /**
   * const products = useState(...)[0]
   * const setProducts = useState(...)[1]
   */
  // const [products, setProducts] = useState(productService.getAllProducts());
  const products = useSelector((state) => state.product.products);

  // Để làm gì?
  //giá trị page ở đây được hiển thị số trang
  const [page, setPage] = useState(0);
  //giá trị rowsPerPage được hiển thị ra số sản phẩm trên 1 trang
  //setRowsPerPage ở đây được sử dụng thay đổi , cập nhập giá trị
  const [rowsPerPage, setRowsPerPage] = useState(5);
  // Trong component này open và setOpen được sử dung khi bật tắt hiển thị Dialog Form Create or Update
  const [open, setOpen] = useState(false);
  //tạo ra một state lưu trữ từ khóa tìm kiếm trong component
  const [searchKeyword, setSearchKeyword] = useState("");
  // state --> *ten cua reducer* --> *ten cua thanh phan trong state*
  //dispatch gọi để xử lý các hàm action trong reducer
  const dispatch = useDispatch();

  //hàm xử lý sự kiện để cập nhập giá trị của từ khóa tìm kiếm
  const handleSearchKeywordChange = (event) => {
    setSearchKeyword(event.target.value);
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.name.toLowerCase().includes(searchKeyword.toLowerCase())
    );
  }, [products, searchKeyword]);

  // hàm trên được sử dụng khi thay đổi Trang
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // hàm này được sử dụng khi thay đổi cột trong từng trang
  const handleChangeRowsPerPage = (event) => {
    //xử lýthay đổi số hàng hiển thị trên mỗi trang
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const showEditProductDialog = (productId) => {
    // cập nhập giá trị của biến curentProductId truyền vào productId
    dispatch(setCurrentProductId({ currentProductId: productId }));

    // hiển thị dialog
    setOpen(true);
  };

  //Xử lý cập nhập danh sách

  //Xử lý khi xóa sản phẩm
  const deleteProduct = (productId) => {
    // Dispatch 1 action để xóa product khỏi redux store theo product id
    dispatch(deleteProductById({ productId }));
  };
  // useMemo được sử dụng để tạo và lưu trữ các cột trong bảng dữ liệu
  // column này ở đây được sử dụng như một đối tượng mô tả một cột và các thuộc tính
  const columns = useMemo(() => {
    return [
      {
        id: "name",
        label: "Name",
        minWidth: 170,
        align: "center",
        format: (value) => (value ? value.toLocaleString("en-US") : ""),
      },
      {
        id: "type",
        label: "Type",
        minWidth: 170,
        align: "center",
        format: (value) => (value ? value.toLocaleString("en-US") : ""),
      },
      {
        id: "origin",
        label: "Origin",
        minWidth: 170,
        align: "center",
        format: (value) => (value ? value.toLocaleString("en-US") : ""),
      },
      {
        id: "time",
        label: "Time",
        minWidth: 170,
        align: "center",
        format: (value) => (value ? value.toLocaleString("en-US") : ""),
      },
      {
        id: "variant",
        label: "Variant",
        minWidth: 170,
        align: "center",
        format: (value) => (value ? value.toLocaleString("en-US") : ""),
      },
      {
        id: "category",
        label: "Category",
        minWidth: 170,
        align: "center",
        format: (value, product) => {
          const category = useSelector((state) =>
            selectCategoryById(state, product.categoryId)
          );
          (value) => (value ? value.toLocaleString("en-Us") : "");
        },
      },
      {
        id: "action",
        label: "action",
        minWidth: 170,
        align: "center",
        // IconButton được lắng nghe sự kiện onClick và nhận vào một id khi Click vào
        // Với form IconButton được nhận sẽ hiển thị EditPRoductDiaglog hoặc là deleteProduct theo id
        format: (value, product) => (
          <>
            <IconButton onClick={() => showEditProductDialog(product.id)}>
              <SettingsIcon />
            </IconButton>
            <IconButton onClick={() => deleteProduct(product.id)}>
              <DeleteIcon />
            </IconButton>
          </>
        ),
      },
    ];
  }, [showEditProductDialog]);

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <Button
        variant="outlined"
        style={{
          background: "white",
          color: "blue",

          margin: 20,
        }}
        onClick={() => {
          setOpen(true);
        }}
      >
        Create product
      </Button>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search..."
          value={searchKeyword}
          onChange={handleSearchKeywordChange}
        />
      </Search>
      {/* gọi component ProductForm và truyền prop vào để xử dụng component con của nó tại đây */}
      <ProductForm
        open={open}
        // tắt Dialog bằng cách setOpen(false)
        handleClose={() => {
          setOpen(false);
        }}
      />

      <TableContainer sx={{ maxHeight: 440 }}>
        <Table>
          <TableHead style={{ backgroundColor: "black" }}>
            <TableRow>
              {columns.map((comlumn) => (
                <TableCell
                  key={comlumn.id}
                  align="center"
                  style={{ minWidth: columns.minWidth, color: "white" }}
                >
                  {comlumn.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredProducts
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((product) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={product.id}
                  >
                    {columns.map((column) => {
                      const value = product[column.id];
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{ background: "white", color: "black" }}
                        >
                          {column.format
                            ? column.format(value, product)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[3, 5, 10, 15, 20]}
        component="div"
        count={products.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

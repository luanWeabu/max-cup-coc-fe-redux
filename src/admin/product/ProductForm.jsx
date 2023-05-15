import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import productService from "../services/ProductService";
import { useDispatch, useSelector } from "react-redux";
import {
  addProduct,
  setCurrentProductId,
  setProductDetail,
  updateProductById,
} from "../redux/product/productSlice";
//function CreateProduct nhận vào một prop để lấy các dữ liệu từ component cha để xử lý
function ProductForm(props) {
  // nhận vào giá trị chứa một Object và các thuộc tính được khởi tạo
  const currentProductId = useSelector(
    (state) => state.product.currentProductId
  );

  const productDetail = useSelector((state) => state.product.productDetail);

  const [productFormData, setProductFormData] = useState({
    id: currentProductId ? currentProductId : "",
    name: "",
    type: "",
    origin: "",
    time: "",
  });

  const [open, setOpen] = useState(props.open);
  const [isFormValid, setIsFormValid] = useState(false);
  const [isProductUpdated, setIsProductUpdated] = useState(false);
  const [originalFormData, setOriginalFormData] = useState({
    ...productFormData,
  });

  const dispatch = useDispatch();

  //Đoạn mã này được sử dụng React Hook useEffect để xử lý các hành động khi component render
  //Nếu giá trị có tồn tại thì setPoriductFormData và setOriginalFormData sẽ được sử dụng để cập nhập giá trị
  //Khi
  useEffect(() => {
    if (currentProductId) {
      dispatch(setProductDetail());
      //Nếu giá trị không tồn tại sẽ để mặc định cho các thuộc tính là rông ""
    } else {
      setProductFormData({
        id: "",
        name: "",
        type: "",
        origin: "",
        time: "",
      });
      setOriginalFormData({
        id: "",
        name: "",
        type: "",
        origin: "",
        time: "",
      });
    }
    setIsProductUpdated(false);
  }, [currentProductId]);

  //Nếu nhưu productDetail có tồn tại thì nó sẽ gán các giá trị vào
  useEffect(() => {
    if (productDetail) {
      setProductFormData({
        id: productDetail.id,
        name: productDetail.name,
        type: productDetail.type,
        origin: productDetail.origin,
        time: productDetail.time,
      });
      setOriginalFormData({
        id: productDetail.id,
        name: productDetail.name,
        type: productDetail.type,
        origin: productDetail.origin,
        time: productDetail.time,
      });
    }
  }, [productDetail]);

  //Dùng để đóng Dialog hoặc modal
  const handleClose = () => {
    props.handleClose();
    // cập nhập lại component cha sau khi có sự thay đổi
    dispatch(setCurrentProductId({ currentProductId: null }));

    // 1. lắng nghe state nào? - currentProductId
    // 2. state currentProductId này được lưu ở đâu? và nó local state hay global state? - Redux store
    // 3. Khi thay đổi thì minh cần thay đổi ở đâu? - Sử dụng reducer function
    // 4. Làm sao để sử dụng reducer function? - dispatch một action trong reducer mà tương ứng với reducer function cần thiết
  };

  //thiết lập giá trị isProductUpdate thành false mỗi khi giá trị của biến open thay đổi
  useEffect(() => {
    setIsProductUpdated(false);
  }, [open]);

  //Object.values(productFormData) được sử dụng để rtuy cập vào tất cả các giá trị của object productFromdata
  // hàm some được sử dụng để kiểm tra xem có ít nhất một giá trị nào khác rỗng hay không
  //thiết lặp giá trị isFromvalid bằng giá trị của hasChange.
  //Nếu giá trị của hasChange true nó cũng sẽ true và ngược lại
  useEffect(() => {
    const hasChanges = Object.values(productFormData).some(
      (value) => value !== ""
    );
    setIsFormValid(hasChanges);
  }, [productFormData]);

  //đây là hàm để xử lý khi thêm product vào
  const handleAddProduct = () => {
    //sao chép các giá trị của productFormData và thêm một thuộc tính id mới được tạo ra
    const product = { ...productFormData };
    dispatch(addProduct({ addedProduct: product }));
    //set lại giá trị thành ban đầu
    setProductFormData({
      id: "",
      name: "",
      type: "",
      origin: "",
      time: "",
    });
    //dùng để đóng cửa sổ
    props.handleClose();
    // làm mới danh sách
  };
  //đây là hàm xử lý khi thêm product vào
  const handleUpdateProduct = () => {
    //cập nhập product khi truyền vào
    const updatedProduct = {
      id: productFormData.id,
      name: productFormData.name,
      type: productFormData.type,
      origin: productFormData.origin,
      time: productFormData.time,
    };

    dispatch(updateProductById({ updatedProduct }));
    props.handleClose();
  };

  //Hàm xử lý khi bấm nút
  const handleSubmit = async (e) => {
    //e được sử dụng để ngăn chặn hành động mặc định của form khi được submit
    e.preventDefault();
    //Nếu như tồn tại id nó sẽ hiển thị dialog Edit và không sẽ hiển thị Create Product
    if (productFormData.id) {
      handleUpdateProduct(productFormData);
    } else {
      handleAddProduct();
    }
  };
  //Object.keys để lấy ra tất cả các thuộc tính keys của đối tượng productFromData
  //some trả về giá trị tue khi ít nhất một phần tử trong mảng truyền vào thỏa mãn điều kiện callback
  const hasFormChange = Object.keys(productFormData).some(
    (key) => productFormData[key] !== originalFormData[key]
  );

  return (
    <div>
      <Dialog open={props.open} onClose={props.handleClose}>
        <DialogTitle>
          {productFormData.id ? "Edit Product" : "Create Product"}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            label="name"
            type="text"
            fullWidth
            name="name"
            value={productFormData.name}
            onChange={(e) =>
              setProductFormData({ ...productFormData, name: e.target.value })
            }
          />
          <TextField
            autoFocus
            required
            margin="dense"
            label="type"
            type="text"
            fullWidth
            name="type"
            value={productFormData.type}
            onChange={(e) =>
              setProductFormData({ ...productFormData, type: e.target.value })
            }
          />
          <TextField
            autoFocus
            required
            margin="dense"
            label="origin"
            type="text"
            fullWidth
            name="origin"
            value={productFormData.origin}
            onChange={(e) =>
              setProductFormData({ ...productFormData, origin: e.target.value })
            }
          />
          <TextField
            autoFocus
            required
            margin="dense"
            label="time"
            type="date"
            fullWidth
            name="time"
            value={productFormData.time}
            onChange={(e) => {
              console.log(e.target.value);
              setProductFormData({ ...productFormData, time: e.target.value });
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={handleSubmit}
            disabled={!isFormValid || !hasFormChange}
          >
            {productFormData.id ? "Save Changes" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ProductForm;

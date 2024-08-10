import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  Grid,
  Input,
  MenuItem,
  Chip,
  CircularProgress,
  ImageList,
} from "@mui/material";
import Header from "../../components/admin/Header/AdminSubHeader";
import SizeModel from "../../components/admin/CategoryModal/SizeModal";
import { useSelector, useDispatch } from "react-redux";
import { getCategories } from "../../actions/categoryActions";
import {
  addProduct,
  editProduct,
  uploadFile,
} from "../../actions/productActions";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import validateFormData from "../../utils/validation";
import Cropper from "react-easy-crop";
import CropperImg from "../../components/cropper/CropperImg";
import TitlebarImageList from "../../components/imagelist/ImgList";

function ProductManagement() {
  const initialData = {
    name: "",
    // price: "",
    category: "",
    // subCategory: "",
    fabric: "",
    description: "",
    images: [],
    sizes: [],
  };
  const location = useLocation();
  const productToEdit = location.state?.product;

  const [formData, setFormData] = useState(
    productToEdit ? productToEdit : initialData
  );
  const [open, setOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState();
  const [selectedFile, setSelectedFile] = useState(null);
  const { categories } = useSelector((state) => state.category);
  const { loading, error } = useSelector((state) => state.products);
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [imageURLs, setImageURLs] = useState([]);
  const [croppedImage, setCroppedImage] = useState([]);
  console.log(croppedImage);
  const [imagePreviews, setImagePreviews] = useState(
    productToEdit ? productToEdit.images : []
  );
  console.log(selectedFile);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleClickOpen = (size) => {
    setSelectedSize(size);
    setOpen(true);
  };
  console.log(productToEdit, formData.category, categories);
  console.log(categories.find((item) => item._id === formData.category));

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDelete = (src) => {
    if (formData.images.length <= 3) {
      alert("ss");
      toast.error("At least two images are required");
      return;
    }
    alert(src);
    const updatedImages = formData.images.filter((item) => item != src);

    setFormData({ ...formData, images: updatedImages });
    console.log(updatedImages);
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    console.log(files);
    setSelectedFile(files);

    const urls = files.map((file) => URL.createObjectURL(file));
    setImageURLs(urls);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    const errors = validateFormData(formData);
    console.log(errors);
    if (Object.keys(errors).length > 0) {
      for (let key in errors) {
        toast.error(errors[key]);
      }
      return;
    }

    if (productToEdit) {
      console.log(formData);
      dispatch(editProduct(formData, productToEdit._id));
      navigate("/admin/productList");
    } else {
      //upload images
      if (selectedFile === null || selectedFile.length <= 2) {
        toast.error("At least Three image is required");
        return;
      }
      console.log(selectedFile, croppedImage);
      selectedFile[0] = croppedImage;
      console.log(selectedFile);
      const imagePreviews = await uploadFile(
        formData,
        selectedFile,
        setUploadProgress
      );

      setImagePreviews(imagePreviews.files);
      imagePreviews?.files?.map((item) => {
        console.log(item.path);
        formData.images.push(item.path);
      });

      dispatch(addProduct(formData));
      setFormData(initialData);
      toast.success("Product added successfully");
      setImagePreviews([]);
      setSelectedFile(null);
    }
  };
  const handleSave = (detail) => {
    console.log(detail);
    let exists = false;
    formData.sizes.some((item) => {
      if (item.size === detail.size) {
        item.stock = detail.stock;
        item.price = detail.price;
        exists = true;
        return true;
      }
      return false;
    });

    if (!exists) {
      formData.sizes.push(detail);
    }
  };
  let obj = null;
  useEffect(() => {
    obj = formData.sizes.find((item) => item.size === selectedSize);
  }, [selectedSize]);
  useEffect(() => {
    if (!user.isAdmin || !isAuthenticated) navigate("/");
  }, [dispatch]);

  return (
    <Box m="20px" width={"100%"}>
      <Header title="ADD PRODUCT" />
      <Box
        component="form"
        sx={{
          background: "white",
          padding: "20px",
          margin: "auto",
          width: "90%",
        }}
        onSubmit={handleFormSubmit}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <TextField
              label="Product Name"
              variant="outlined"
              fullWidth
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              select
              label="Category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              helperText="Please select Category"
              sx={{ marginTop: "20px", width: "100%" }}
            >
              {categories.map((option) => (
                <MenuItem key={option._id} value={option._id}>
                  {option.category}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Fabric"
              variant="outlined"
              fullWidth
              name="fabric"
              value={formData.fabric}
              onChange={handleInputChange}
              sx={{ marginTop: "20px" }}
            />
          </Grid>
        </Grid>
        <TextField
          label="Description"
          variant="outlined"
          multiline
          rows={4}
          fullWidth
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          sx={{ marginTop: "20px" }}
        />

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Box sx={{ marginTop: "20px" }}>
              <Typography variant="body1" gutterBottom>
                Upload Image
              </Typography>
              <Input
                type="file"
                fullWidth
                inputProps={{ multiple: true }}
                sx={{ display: "block" }}
                onChange={handleFileChange}
              />
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <Chip
              label="M"
              onClick={() => handleClickOpen("M")}
              sx={{ marginRight: "10px" }}
            />
            <Chip
              label="L"
              onClick={() => handleClickOpen("L")}
              sx={{ marginRight: "10px" }}
            />
            <Chip
              label="S"
              onClick={() => handleClickOpen("S")}
              sx={{ marginRight: "10px" }}
            />
            <Chip
              label="XS"
              onClick={() => handleClickOpen("XS")}
              sx={{ marginRight: "10px" }}
            />
          </Grid>
        </Grid>
        <div>
          {imageURLs.map((img, index) => (
            <CropperImg
              key={index}
              img={img}
              index={index}
              setCroppedImage={setCroppedImage}
            />
          ))}

          {imagePreviews.length > 0 && (
            <ImageList sx={{ width: 500, height: 450 }}>
              {imagePreviews.map((file, index) => (
                <TitlebarImageList
                  src={`${productToEdit ? file : file.path}`}
                  handleDelete={handleDelete}
                />
              ))}
            </ImageList>
            //
            //     // <div key={index}>
            //     //   <img
            //     //     src={`http://localhost:4000/${
            //     //       productToEdit ? file : file.path
            //     //     }`}
            //     //     alt={`http://localhost:4000/${file.path}`}
            //     //     style={{ width: "200px", height: "auto", margin: "10px" }}
            //     //   />
            //     // </div>
            //   ))}
            // </div>
          )}
        </div>
        {uploadProgress < 100 && (
          <CircularProgress variant="determinate" value={uploadProgress} />
        )}

        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={loading}
          sx={{
            width: "60%",
            marginX: "auto",
            display: "flex",
            marginTop: "30px",
            position: "unset",
          }}
        >
          {loading && (
            <CircularProgress
              size={24} // Size of the spinner
              sx={{
                position: "absolute",
                left: "50%",
                top: "50%",
                marginLeft: "-12px",
                marginTop: "-12px",
              }}
            />
          )}
          {loading ? "loading..." : productToEdit ? "Edit" : "Submit"}
        </Button>
      </Box>
      <ToastContainer />
      <SizeModel
        open={open}
        handleClose={handleClose}
        selectedSize={selectedSize}
        // obj =  formData.size.find(item => item.size === seletedSize);
        sizes={formData.sizes}
        obj={obj}
        onSave={handleSave}
      />
    </Box>
  );
}

export default ProductManagement;

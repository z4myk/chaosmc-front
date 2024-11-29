import {useDispatch, useSelector} from 'react-redux'
import {useState} from 'react'
import productsApi from '../api/productsApi';


export const useProductStore = () => {
    const [productSearch, setProductSearch] = useState([]);
      const {products, isLoading, activeProduct, errorMessage, onSetError} = useSelector(state => state.product);
      const dispatch = useDispatch();
  
      const setActiveProduct = (product) => {
          dispatch(onSetActiveProduct(product))
      }
  
      const startLoadingProducts = async() => {
          try{
              dispatch(onLoadingProducts());
              const { data } = await productsApi.get('/products');
              dispatch(onSetProducts(data))
          }catch(error){
              console.log(error)
          }
      }
  
      const startSavingProducts = async (product) => {
          try {
            if (product._id) {
              await productsApi.put(`/products/${product._id}`, product);
              dispatch(onUpdateProduct(product));
              return;
            }
            const response = await productsApi.post('/products', product, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            });
            const data = response.data; // Asignar la respuesta a la variable `data`
            dispatch(onAddProduct({ ...data, _id: data._id }));
            return response; // Devolver la respuesta completa
          } catch (error) {
            console.log(error.request);
          }
        };
  
      const startDeleteProduct = async(product) => {
          try{
              await productsApi.delete(`/products/${product._id}`);
              dispatch(onDeleteProduct())
          }catch(error){
              dispatch(onSetError(error.responde.data.msg))
  
              setTimeout(() => {
                  dispatch(onClearError())
              }, 10)
          }
      };
  
      const searchProducts = (query) => {
        const filteredProducts = products.filter((product) =>
          product.name.toLowerCase().includes(query.toLowerCase())
        );
        setProductSearch(filteredProducts);
      };
  
  
  
      return {
          //props
          products,
          isLoading,
          activeProduct,
          errorMessage,
  
          //functions
          startLoadingProducts,
          setActiveProduct,
          startSavingProducts,
          startDeleteProduct,
          searchProducts,
  
      }
      
  }
  
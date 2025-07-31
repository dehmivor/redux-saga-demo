import React, { useEffect } from "react";
import { View, Text, FlatList, ActivityIndicator, Button } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "./redux/productSlice";

export default function ProductList() {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) return <ActivityIndicator />;
  if (error) return <Text>Error: {error}</Text>;

  return (
    <View>
      <Button title="Reload" onPress={() => dispatch(fetchProducts())} />
      <FlatList
        data={items}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View>
            <Text>
              {item.name} - {item.price}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

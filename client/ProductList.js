import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  addProduct,
  deleteProduct,
  fetchProducts,
  updateProduct,
} from "./redux/productSlice";

export default function ProductList() {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.products);

  // Local states cho search, sort, filter và CRUD form
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState(null); // 'name-asc', 'name-desc', 'price-asc', 'price-desc'
  const [filterPrice, setFilterPrice] = useState(null); // ví dụ: 'under50', '50to100', 'above100'
  const [form, setForm] = useState({ _id: null, name: "", price: "" }); // Dùng cho Add/Update form
  const [formVisible, setFormVisible] = useState(false);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // CRUD Handlers

  const onAddNew = () => {
    setForm({ _id: null, name: "", price: "" });
    setFormVisible(true);
  };

  const onEdit = (item) => {
    setForm({
      _id: item._id,
      name: item.name,
      price: item.price.toString(),
    });
    setFormVisible(true);
  };
  const onFormSubmit = () => {
    if (!form.name || !form.price) {
      alert("Please fill all fields");
      return;
    }
    const priceNum = parseFloat(form.price);
    if (isNaN(priceNum) || priceNum < 0) {
      alert("Price must be a valid positive number");
      return;
    }

    if (form._id) {
      dispatch(updateProduct({ ...form, price: priceNum }));
    } else {
      dispatch(addProduct({ name: form.name, price: priceNum }));
    }

    setFormVisible(false);
    setForm({ _id: null, name: "", price: "" });
  };

  // Filter, sort, search trên dữ liệu local (hoặc có thể implement filter/sort/search từ server nếu backend hỗ trợ)
  const filteredItems = items
    .filter((item) =>
      item.name.toLowerCase().includes(searchTerm.trim().toLowerCase())
    )
    .filter((item) => {
      if (!filterPrice) return true;
      if (filterPrice === "under50") return item.price < 50;
      if (filterPrice === "50to100")
        return item.price >= 50 && item.price <= 100;
      if (filterPrice === "above100") return item.price > 100;
      return true;
    })
    .sort((a, b) => {
      if (!sortBy) return 0;
      if (sortBy === "name-asc") return a.name.localeCompare(b.name);
      if (sortBy === "name-desc") return b.name.localeCompare(a.name);
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      return 0;
    });

  // UI
  if (loading) return <ActivityIndicator style={{ marginTop: 20 }} />;
  if (error) return <Text style={{ color: "red" }}>Error: {error}</Text>;

  return (
    <View style={{ flex: 1, padding: 16 }}>
      {/* Search */}
      <TextInput
        placeholder="Search by name..."
        value={searchTerm}
        onChangeText={setSearchTerm}
        style={styles.input}
      />

      {/* Filter */}
      <View style={styles.row}>
        <Text style={styles.label}>Filter Price: </Text>
        <Button
          title="All"
          onPress={() => setFilterPrice(null)}
          color={!filterPrice ? "blue" : "gray"}
        />
        <Button
          title="< 50"
          onPress={() => setFilterPrice("under50")}
          color={filterPrice === "under50" ? "blue" : "gray"}
        />
        <Button
          title="50-100"
          onPress={() => setFilterPrice("50to100")}
          color={filterPrice === "50to100" ? "blue" : "gray"}
        />
        <Button
          title="> 100"
          onPress={() => setFilterPrice("above100")}
          color={filterPrice === "above100" ? "blue" : "gray"}
        />
      </View>

      {/* Sort */}
      <View style={styles.row}>
        <Text style={styles.label}>Sort By: </Text>
        <Button
          title="Name ↑"
          onPress={() => setSortBy("name-asc")}
          color={sortBy === "name-asc" ? "blue" : "gray"}
        />
        <Button
          title="Name ↓"
          onPress={() => setSortBy("name-desc")}
          color={sortBy === "name-desc" ? "blue" : "gray"}
        />
        <Button
          title="Price ↑"
          onPress={() => setSortBy("price-asc")}
          color={sortBy === "price-asc" ? "blue" : "gray"}
        />
        <Button
          title="Price ↓"
          onPress={() => setSortBy("price-desc")}
          color={sortBy === "price-desc" ? "blue" : "gray"}
        />
      </View>

      {/* Add new product */}
      <Button title="Add New Product" onPress={onAddNew} />

      {/* Product list */}
      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>
              {item.name} - ${item.price.toFixed(2)}
            </Text>

            <View style={styles.itemButtons}>
              <Button title="Edit" onPress={() => onEdit(item)} />
              <Button
                title="Delete"
                color="red"
                onPress={() => dispatch(deleteProduct(item._id))}
              />
            </View>
          </View>
        )}
        style={{ flex: 1, marginTop: 10 }}
      />

      {/* Form Add / Update */}
      {formVisible && (
        <View style={styles.form}>
          <TextInput
            placeholder="Name"
            value={form.name}
            onChangeText={(text) => setForm({ ...form, name: text })}
            style={styles.input}
          />
          <TextInput
            placeholder="Price"
            value={form.price}
            onChangeText={(text) => setForm({ ...form, price: text })}
            keyboardType="numeric"
            style={styles.input}
          />
          <Button title="Save" onPress={onFormSubmit} />
          <Button
            title="Cancel"
            color="gray"
            onPress={() => setFormVisible(false)}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginVertical: 8,
    borderRadius: 4,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    flexWrap: "wrap",
  },
  label: {
    marginRight: 8,
    fontWeight: "bold",
  },
  item: {
    padding: 12,
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemButtons: {
    flexDirection: "row",
    gap: 10, // nếu không hỗ trợ trên RN bạn có thể dùng marginHorizontal cho từng button
  },
  form: {
    backgroundColor: "#f9f9f9",
    padding: 16,
    borderRadius: 8,
    marginTop: 10,
  },
});

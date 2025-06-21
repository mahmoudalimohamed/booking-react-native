import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useFetch } from "./hooks/useFetch";

export default function Z() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchUsers = async (currentPage, isRefresh = false) => {
    try {
      if (isRefresh) setIsRefreshing(true);
      else setIsLoadingMore(true);

      const response = await useFetch.get(
        `https://reqres.in/api/users?page=${currentPage}`
      );

      if (isRefresh) {
        setUsers(response.data); // reset data
      } else {
        setUsers((prev) => [...prev, ...response.data]);
      }

      if (currentPage >= response.total_pages) setHasMore(false);
    } catch (error) {
      console.error("Error fetching users:", error.message);
    } finally {
      if (isRefresh) setIsRefreshing(false);
      else setIsLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  const loadMore = () => {
    if (!isLoadingMore && hasMore) setPage((prev) => prev + 1);
  };

  const onRefresh = () => {
    setPage(1);
    setHasMore(true);
    fetchUsers(1, true);
  };

  const renderFooter = () => {
    if (!isLoadingMore) return null;
    return (
      <ActivityIndicator style={{ margin: 10 }} size="large" color="#0000ff" />
    );
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>👥 User List</Text>
      <Text style={styles.headerSub}>Fetched from ReqRes API</Text>
    </View>
  );

  const renderEmpty = () => (
    <View style={styles.empty}>
      <Text>No users found.</Text>
    </View>
  );

  const renderSeparator = () => (
    <View style={{ height: 10, backgroundColor: "transparent" }} />
  );

  const getItemLayout = (_, index) => ({
    length: 90,
    offset: 90 * index,
    index,
  });

  const renderItem = ({ item }) => (
    <View style={styles.userCard}>
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View>
        <Text style={styles.name}>
          {item.first_name} {item.last_name}
        </Text>
        <Text style={styles.email}>{item.email}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmpty}
        ItemSeparatorComponent={renderSeparator}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        refreshing={isRefreshing}
        onRefresh={onRefresh}
        initialNumToRender={6}
        maxToRenderPerBatch={10}
        windowSize={5}
        getItemLayout={getItemLayout}
        showsVerticalScrollIndicator={false}
        horizontal={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 40,
  },
  header: {
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
  },
  headerSub: {
    color: "#555",
  },
  userCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
  },
  email: {
    color: "#555",
  },
  empty: {
    padding: 30,
    alignItems: "center",
  },
});

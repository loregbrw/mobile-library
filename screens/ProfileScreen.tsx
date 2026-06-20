import { useAuth } from "../context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { useReviews } from "../context/ReviewsContext";
import { Text, View, StyleSheet, Image, ScrollView, TouchableOpacity, } from "react-native";

import UserImg from "../assets/user.png";
import Header from "../components/Header";

const ProfileScreen = () => {

    const { user, logout } = useAuth();
    const { getReviewsByUser } = useReviews();

    const reviews = user
        ? getReviewsByUser(user.id).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        : [];

    return (
        <View style={styles.global}>
            <Header />
            <ScrollView style={styles.container} contentContainerStyle={styles.content}>
                <View style={styles.profileCard}>
                    <View style={styles.userInfo}>
                        <Image source={UserImg} style={styles.avatar} />

                        <View>
                            <Text style={styles.username}> {user?.username} </Text>
                            <Text style={styles.userId}> @{user?.id} </Text>
                        </View>
                    </View>

                    <TouchableOpacity style={styles.logoutButton} onPress={logout}>
                        <Ionicons name="log-out-outline" size={20} color="#d9534f" />
                        <Text style={styles.logoutText} > Logout </Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.sectionTitle}>Minhas Resenhas ({reviews.length})</Text>

                {reviews.map(review => (
                    <View
                        key={review.id}
                        style={styles.reviewCard}
                    >
                        <Image
                            source={{
                                uri:
                                    review.book
                                        .thumbnail ??
                                    "https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png",
                            }}
                            style={styles.bookCover}
                        />

                        <View style={styles.reviewContent}>
                            <Text style={styles.bookTitle}> {review.book.title} </Text>
                            <Text style={styles.bookAuthors}>{review.book.authors.join(", ")}</Text>

                            <Text style={styles.rating}>{"⭐".repeat(review.rating)}</Text>
                            <Text style={styles.reviewText}>{review.text}</Text>

                            <Text style={styles.reviewDate}>{new Date(review.updatedAt ?? review.createdAt).toLocaleDateString("pt-BR")}</Text>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    global: {
        flex: 1,
        backgroundColor: "#f5f5f5",
    },
    container: {
        flex: 1,
    },
    content: {
        padding: 15,
        gap: 15,
    },
    profileCard: {
        backgroundColor: "#fff",
        borderRadius: 5,
        padding: 15,

        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    userInfo: {
        flexDirection: "row",
        alignItems: "center",
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 35,
    },
    username: {
        fontSize: 22,
        fontWeight: "700",
    },
    userId: {
        color: "#666",
        marginTop: 2,
    },
    logoutButton: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
    },
    logoutText: {
        color: "#d9534f",
        fontWeight: "600",
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: "700",
    },
    reviewCard: {
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 5,

        flexDirection: "row",
    },
    bookCover: {
        width: 80,
        height: 120,
        marginRight: 15,
    },
    reviewContent: {
        flex: 1,
    },
    bookTitle: {
        fontSize: 18,
        fontWeight: "700",
    },
    bookAuthors: {
        color: "#666",
        marginBottom: 5,
    },
    rating: {
        marginBottom: 10,
    },
    reviewText: {
        textAlign: "justify",
    },
    reviewDate: {
        marginTop: 10,
        color: "#888",
        fontSize: 12,
    },
});

export default ProfileScreen;
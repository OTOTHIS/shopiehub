// // ignore_for_file: unnecessary_new

// class Product {
//   final String title;
//   final String description;
//   final String image;
//   final int price;

//   Product(this.title, this.description, this.image, this.price);

//   factory Product.fromJson(Map<String, dynamic> json) {
//     return new Product(json["id"], json["title"], json["image"], json["price"]);
//   }
// }
class Product {
  final String id; // Change type to String
  final String title;
  final String description;
  final String image;
  final int price;
  final String? category;

  Product(this.id, this.title, this.description, this.image, this.price,
      {this.category});

  factory Product.fromJson(Map<String, dynamic> json) {
    return Product(
      json["id"].toString(), // Convert to String if needed
      json["title"],
      json["description"],
      json["image"],
      json["price"] as int,
       category: json["category"] as String?, // Ensure 'price' is interpreted as an int
    );
  }
}

// ignore_for_file: sized_box_for_whitespace, library_private_types_in_public_api, override_on_non_overriding_member

import 'package:flutter/material.dart';
import 'package:testv1/animation/FadeAnimation.dart';
import 'package:testv1/models/product.dart';
import 'package:testv1/pages/product_view.dart';
import 'package:flutter/services.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class SearchPage extends StatefulWidget {
  const SearchPage({Key? key}) : super(key: key);

  @override
  _SearchPageState createState() => _SearchPageState();
}

class _SearchPageState extends State<SearchPage> {
  List<dynamic> productList = [];
  @override
  void initState() {
    products();
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    productCart(Product product) {
      return AspectRatio(
        aspectRatio: 1 / 1,
        child: FadeAnimation(
            1.5,
            GestureDetector(
              onTap: () {
                Navigator.push(
                    context,
                    MaterialPageRoute(
                        builder: (context) => ProductViewPage(
                              product: product,
                            )));
              },
              child: Container(
                margin: const EdgeInsets.only(right: 5, bottom: 5),
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(20),
                  color: Colors.white,
                  boxShadow: [
                    BoxShadow(
                      offset: const Offset(5, 10),
                      blurRadius: 15,
                      color: Colors.grey.shade200,
                    )
                  ],
                ),
                padding: const EdgeInsets.all(10),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Container(
                      height: 100,
                      child: Stack(
                        children: [
                          Container(
                            width: double.infinity,
                            child: ClipRRect(
                                borderRadius: BorderRadius.circular(15),
                                child: Image.network(
                                    // "http://127.0.0.1:8000/storage/" +
                                    //     product.image,
                                    "http://127.0.0.1:8000/storage/images/products/T4VzVakzIiE810NP50WxPneQbeSdsM1cSxth4gq2.jpg",
                                    fit: BoxFit.cover)),
                          ),
                          // Add to cart button
                          Positioned(
                            right: 5,
                            bottom: 5,
                            child: MaterialButton(
                              color: Colors.black,
                              minWidth: 45,
                              height: 45,
                              shape: RoundedRectangleBorder(
                                  borderRadius: BorderRadius.circular(50)),
                              onPressed: () {
                                print("hello world");
                              },
                              padding: const EdgeInsets.all(2),
                              child: const Center(
                                  child: Icon(
                                Icons.favorite_sharp,
                                color: Colors.white,
                                size: 20,
                              )),
                            ),
                          )
                        ],
                      ),
                    ),
                    const SizedBox(
                      height: 20,
                    ),
                    Text(
                      product.title.length > 20
                          ? '${product.title.substring(0, 20)}...'
                          : product.title,
                      style: const TextStyle(
                        color: Colors.black,
                        fontSize: 18,
                      ),
                    ),
                    const SizedBox(
                      height: 10,
                    ),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text(
                          product.description.length > 20
                              ? '${product.description.substring(0, 20)}...'
                              : product.description,
                          style: TextStyle(
                            color: Color.fromRGBO(37, 99, 235, 10),
                            fontSize: 14,
                          ),
                        ),
                        Text(
                          "\$ " + product.price.toString() + '.00',
                          style: const TextStyle(
                              color: Colors.black,
                              fontSize: 18,
                              fontWeight: FontWeight.w800),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            )),
      );
    }

    return Scaffold(
        appBar: AppBar(
          backgroundColor: Colors.transparent,
          elevation: 0,
          title: Container(
            height: 45,
            child: TextField(
              autofocus: true,
              cursorColor: Colors.grey,
              decoration: InputDecoration(
                contentPadding:
                    const EdgeInsets.symmetric(horizontal: 20, vertical: 0),
                filled: true,
                fillColor: Colors.white,
                prefixIcon: const Icon(Icons.search, color: Colors.black),
                border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(50),
                    borderSide: BorderSide.none),
                hintText: "Search e.g Sweatshirt",
                hintStyle: const TextStyle(fontSize: 14, color: Colors.black),
              ),
            ),
          ),
        ),
        body: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Expanded(
              child: GridView.builder(
                gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                  crossAxisCount: 2,
                  crossAxisSpacing: 2, // Adjust as needed
                  mainAxisSpacing: 6, // Adjust as needed
                ),
                itemCount: productList.length,
                itemBuilder: (context, index) {
                  return productCart(productList[index]);
                },
              ),
            )
          ],
        ));
  }

  Future<void> products() async {
    try {
      final response =
          await http.get(Uri.parse('http://localhost:9900/api/Allproducts'));

      if (response.statusCode == 200) {
        final List<dynamic> data = json.decode(response.body);

        setState(() {
          productList =
              List<Product>.from(data.map((data) => Product.fromJson(data)));
        });
      } else {
        print('Failed to fetch data. Status code: ${response.statusCode}');
      }
    } catch (error) {
      print('Error: $error');
    }
  }
}

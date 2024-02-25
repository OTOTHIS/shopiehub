// ignore_for_file: sized_box_for_whitespace, prefer_interpolation_to_compose_strings, library_private_types_in_public_api, prefer_const_literals_to_create_immutables, unused_local_variable

import 'dart:convert';
import 'dart:math';

import 'package:testv1/animation/FadeAnimation.dart';
import 'package:testv1/models/product.dart';
import 'package:testv1/pages/product_view.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:http/http.dart' as http;
import 'package:cached_network_image/cached_network_image.dart';

class ExplorePage extends StatefulWidget {
  const ExplorePage({Key? key}) : super(key: key);

  @override
  _ExplorePageState createState() => _ExplorePageState();
}

class _ExplorePageState extends State<ExplorePage>
    with TickerProviderStateMixin {
  late ScrollController _scrollController;
  bool _isScrolled = false;

  List<dynamic> productList = [];
  List<String> size = [
    "S",
    "M",
    "L",
    "XL",
  ];

  List<Color> colors = [
    Colors.black,
    Colors.purple,
    Color.fromRGBO(37, 99, 235, 10),
    Colors.blueGrey,
    const Color(0xFFFFC1D9),
  ];

  int _selectedColor = 0;
  int _selectedSize = 1;

  var selectedRange = const RangeValues(150.00, 1500.00);
  late http.Client client;
  late http.Response response;

  @override
  void initState() {
    _scrollController = ScrollController();
    _scrollController.addListener(_listenToScrollChange);
    products();

    super.initState();
    client = http.Client();
  }

  void _listenToScrollChange() {
    if (_scrollController.offset >= 100.0) {
      setState(() {
        _isScrolled = true;
      });
    } else {
      setState(() {
        _isScrolled = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return CustomScrollView(controller: _scrollController, slivers: [
      SliverAppBar(
        expandedHeight: 300.0,
        elevation: 0,
        pinned: true,
        floating: true,
        stretch: true,
        backgroundColor: Colors.grey.shade50,
        flexibleSpace: FlexibleSpaceBar(
          collapseMode: CollapseMode.pin,
          titlePadding: const EdgeInsets.only(left: 20, right: 30, bottom: 100),
          stretchModes: [
            StretchMode.zoomBackground,
            // StretchMode.fadeTitle
          ],
          title: AnimatedOpacity(
            opacity: _isScrolled ? 0.0 : 1.0,
            duration: const Duration(milliseconds: 500),
            child: FadeAnimation(
                1,
                const Text("Find your 2021 Collections",
                    style: TextStyle(
                      color: Colors.black,
                      fontSize: 28.0,
                    ))),
          ),
          // background: Image.asset(
          //   "assets/images/.png",
          //   fit: BoxFit.cover,
          // )
        ),
        bottom: AppBar(
          toolbarHeight: 70,
          elevation: 0,
          backgroundColor: Colors.transparent,
          title: Row(
            children: [
              Expanded(
                child: FadeAnimation(
                    1.4,
                    Container(
                      height: 50,
                      child: TextField(
                        readOnly: true,
                        cursorColor: Colors.grey,
                        decoration: InputDecoration(
                          contentPadding: const EdgeInsets.symmetric(
                              horizontal: 20, vertical: 20),
                          filled: true,
                          fillColor: Colors.white,
                          prefixIcon:
                              const Icon(Icons.search, color: Colors.black),
                          border: OutlineInputBorder(
                              borderRadius: BorderRadius.circular(10),
                              borderSide: BorderSide.none),
                          hintText: "Search e.g Cotton Sweatshirt",
                          hintStyle: const TextStyle(
                              fontSize: 14, color: Colors.black),
                        ),
                      ),
                    )),
              ),
              const SizedBox(width: 10),
              FadeAnimation(
                  1.5,
                  Container(
                    height: 50,
                    width: 50,
                    decoration: BoxDecoration(
                        color: Colors.white,
                        borderRadius: BorderRadius.circular(10)),
                    child: IconButton(
                      onPressed: () {
                        showFilterModal();
                      },
                      icon: const Icon(
                        Icons.filter_list,
                        color: Colors.black,
                        size: 30,
                      ),
                    ),
                  ))
            ],
          ),
        ),
      ),
      SliverList(
        delegate: SliverChildListDelegate([
          Container(
              padding: const EdgeInsets.only(top: 20, left: 20),
              height: 330,
              child: Column(children: [
                FadeAnimation(
                    1.4,
                    const Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text(
                          'Popular Products',
                          style: TextStyle(
                              color: Colors.black,
                              fontSize: 18,
                              fontWeight: FontWeight.bold),
                        ),
                        Padding(
                          padding: EdgeInsets.only(right: 20.0),
                          child: Text(
                            'See all ',
                            style: TextStyle(color: Colors.black, fontSize: 14),
                          ),
                        ),
                      ],
                    )),
                const SizedBox(
                  height: 10,
                ),
                Expanded(
                    child: ListView.builder(
                        scrollDirection: Axis.horizontal,
                        itemCount: productList.length,
                        itemBuilder: (context, index) {
                          return productCart(productList[index]);
                        }))
              ])),
          Container(
              padding: const EdgeInsets.only(top: 20, left: 20),
              height: 180,
              child: Column(children: [
                FadeAnimation(
                    1.4,
                    const Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text(
                          'For You',
                          style: TextStyle(
                              color: Colors.black,
                              fontSize: 18,
                              fontWeight: FontWeight.bold),
                        ),
                        Padding(
                          padding: EdgeInsets.only(right: 20.0),
                          child: Text(
                            'See all ',
                            style: TextStyle(color: Colors.black, fontSize: 14),
                          ),
                        ),
                      ],
                    )),
                const SizedBox(
                  height: 10,
                ),
                Expanded(
                    child: ListView.builder(
                        scrollDirection: Axis.horizontal,
                        itemCount: productList.length,
                        itemBuilder: (context, index) {
                          return forYou(productList[index]);
                        }))
              ])),
          Container(
              padding: const EdgeInsets.only(top: 20, left: 20),
              height: 330,
              child: Column(children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(
                      'Winter Collection',
                      style: TextStyle(
                          color: Colors.black,
                          fontSize: 18,
                          fontWeight: FontWeight.bold),
                    ),
                    Padding(
                      padding: EdgeInsets.only(right: 20.0),
                      child: Text(
                        'See all ',
                        style: TextStyle(color: Colors.black, fontSize: 14),
                      ),
                    ),
                  ],
                ),
                const SizedBox(
                  height: 10,
                ),
                Expanded(
                    child: ListView.builder(
                        scrollDirection: Axis.horizontal,
                        itemCount: productList.length,
                        itemBuilder: (context, index) {
                          return productCart(productList[index]);
                        }))
              ])),
          Container(
              padding: const EdgeInsets.only(top: 20, left: 20),
              height: 330,
              child: Column(children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(
                      'Cotton Collection',
                      style: TextStyle(
                          color: Colors.black,
                          fontSize: 18,
                          fontWeight: FontWeight.bold),
                    ),
                    Padding(
                      padding: EdgeInsets.only(right: 20.0),
                      child: Text(
                        'See all ',
                        style: TextStyle(color: Colors.black, fontSize: 14),
                      ),
                    ),
                  ],
                ),
                const SizedBox(
                  height: 10,
                ),
                Expanded(
                    child: ListView.builder(
                        reverse: true,
                        scrollDirection: Axis.horizontal,
                        itemCount: productList.length,
                        itemBuilder: (context, index) {
                          return productCart(productList[index]);
                        }))
              ])),
        ]),
      )
    ]);
  }

  Future<void> products() async {
    try {
      final response =
          await http.get(Uri.parse('http://localhost:9900/api/products'));

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
              margin: const EdgeInsets.only(right: 20, bottom: 25),
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
                                  "http://127.0.0.1:9900/images?id=${product.image}",
                                  fit: BoxFit.contain)),
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
                              addToCartModal();
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
                          color: Color.fromRGBO(37, 99, 235, 6),
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

  forYou(Product product) {
    return AspectRatio(
      aspectRatio: 3 / 1,
      child: FadeAnimation(
          1.5,
          Container(
            margin: const EdgeInsets.only(right: 20, bottom: 10),
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
            child: Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Container(
                  width: 100,
                  child: ClipRRect(
                      borderRadius: BorderRadius.circular(15),
                      child: Image.network(
                          "http://127.0.0.1:9900/images?id=${product.image}",
                          loadingBuilder: (BuildContext context, Widget child,
                              ImageChunkEvent? loadingProgress) {
                        if (loadingProgress == null) {
                          return child;
                        } else {
                          // Display a loading indicator while the image is loading
                          return Center(
                            child: CircularProgressIndicator(
                              value: loadingProgress.expectedTotalBytes != null
                                  ? loadingProgress.cumulativeBytesLoaded /
                                      (loadingProgress.expectedTotalBytes ?? 1)
                                  : null,
                            ),
                          );
                        }
                      })),
                ),
                const SizedBox(
                  width: 10,
                ),
                Expanded(
                  child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Text(
                          product.title,
                          style: const TextStyle(
                            color: Colors.black,
                            fontSize: 18,
                          ),
                        ),
                        const SizedBox(
                          height: 5,
                        ),
                        Text(
                          product.description,
                          style: TextStyle(
                            color: Color.fromRGBO(37, 99, 235, 4),
                            fontSize: 13,
                          ),
                        ),
                        const SizedBox(
                          height: 10,
                        ),
                        Text(
                          "\$ " + product.price.toString() + '.00',
                          style: const TextStyle(
                              color: Colors.black,
                              fontSize: 18,
                              fontWeight: FontWeight.w800),
                        ),
                      ]),
                )
              ],
            ),
          )),
    );
  }

  showFilterModal() {
    showModalBottomSheet(
      context: context,
      backgroundColor: Colors.white,
      shape: const RoundedRectangleBorder(
          borderRadius: BorderRadius.only(
              topLeft: Radius.circular(20), topRight: Radius.circular(20))),
      builder: (context) {
        return StatefulBuilder(builder: (context, setState) {
          return Container(
            padding:
                const EdgeInsets.only(top: 20, left: 20, right: 20, bottom: 20),
            height: MediaQuery.of(context).size.height * 0.8,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    const Text(
                      'Filter',
                      style: TextStyle(
                          color: Colors.black,
                          fontSize: 18,
                          fontWeight: FontWeight.bold),
                    ),
                    MaterialButton(
                      onPressed: () {
                        Navigator.pop(context);
                      },
                      minWidth: 40,
                      height: 40,
                      color: Colors.grey.shade300,
                      elevation: 0,
                      padding: const EdgeInsets.all(0),
                      shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(50)),
                      child: const Icon(
                        Icons.close,
                        color: Colors.black,
                      ),
                    )
                  ],
                ),
                const SizedBox(
                  height: 20,
                ),
                const Text(
                  "Color",
                  style: TextStyle(fontWeight: FontWeight.bold, fontSize: 20),
                ),
                const SizedBox(
                  height: 10,
                ),
                Container(
                  height: 60,
                  child: ListView.builder(
                    scrollDirection: Axis.horizontal,
                    itemCount: colors.length,
                    itemBuilder: (context, index) {
                      return GestureDetector(
                        onTap: () {
                          setState(() {
                            _selectedColor = index;
                          });
                        },
                        child: AnimatedContainer(
                          duration: const Duration(milliseconds: 300),
                          margin: const EdgeInsets.only(right: 10),
                          decoration: BoxDecoration(
                              color: _selectedColor == index
                                  ? colors[index]
                                  : colors[index].withOpacity(0.5),
                              shape: BoxShape.circle),
                          width: 40,
                          height: 40,
                          child: Center(
                            child: _selectedColor == index
                                ? const Icon(
                                    Icons.check,
                                    color: Colors.white,
                                  )
                                : Container(),
                          ),
                        ),
                      );
                    },
                  ),
                ),
                const SizedBox(
                  height: 20,
                ),
                const Text(
                  'Size',
                  style: TextStyle(
                      color: Colors.black,
                      fontSize: 18,
                      fontWeight: FontWeight.bold),
                ),
                const SizedBox(
                  height: 10,
                ),
                Container(
                  height: 60,
                  child: ListView.builder(
                    scrollDirection: Axis.horizontal,
                    itemCount: size.length,
                    itemBuilder: (context, index) {
                      return GestureDetector(
                        onTap: () {
                          setState(() {
                            _selectedSize = index;
                          });
                        },
                        child: AnimatedContainer(
                          duration: const Duration(milliseconds: 500),
                          margin: const EdgeInsets.only(right: 10),
                          decoration: BoxDecoration(
                              color: _selectedSize == index
                                  ? Color.fromRGBO(37, 99, 235, 7)
                                  : Colors.grey.shade200,
                              shape: BoxShape.circle),
                          width: 40,
                          height: 40,
                          child: Center(
                            child: Text(
                              size[index],
                              style: TextStyle(
                                  color: _selectedSize == index
                                      ? Colors.white
                                      : Colors.black,
                                  fontSize: 15),
                            ),
                          ),
                        ),
                      );
                    },
                  ),
                ),
                // Slider Price Renge filter
                const SizedBox(
                  height: 20,
                ),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    const Text(
                      'Price Range',
                      style: TextStyle(
                          color: Colors.black,
                          fontSize: 18,
                          fontWeight: FontWeight.bold),
                    ),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.end,
                      children: [
                        Text(
                          '\$ ${selectedRange.start.toStringAsFixed(2)}',
                          style: TextStyle(
                              color: Colors.grey.shade500, fontSize: 12),
                        ),
                        Text(" - ",
                            style: TextStyle(color: Colors.grey.shade500)),
                        Text(
                          '\$ ${selectedRange.end.toStringAsFixed(2)}',
                          style: TextStyle(
                              color: Colors.grey.shade500, fontSize: 12),
                        ),
                      ],
                    ),
                  ],
                ),
                const SizedBox(
                  height: 10,
                ),
                RangeSlider(
                    values: selectedRange,
                    min: 0.00,
                    max: 2000.00,
                    divisions: 100,
                    inactiveColor: Colors.grey.shade300,
                    activeColor: Color.fromRGBO(37, 99, 235, 6),
                    labels: RangeLabels(
                      '\$ ${selectedRange.start.toStringAsFixed(2)}',
                      '\$ ${selectedRange.end.toStringAsFixed(2)}',
                    ),
                    onChanged: (RangeValues values) {
                      setState(() => selectedRange = values);
                    }),
                const SizedBox(
                  height: 20,
                ),
                button('Filter', () {})
              ],
            ),
          );
        });
      },
    );
  }

  addToCartModal() {
    return showModalBottomSheet(
        context: context,
        transitionAnimationController: AnimationController(
            duration: const Duration(milliseconds: 400), vsync: this),
        builder: (context) => StatefulBuilder(
              builder: (context, setState) {
                return Container(
                  height: 350,
                  padding: const EdgeInsets.all(20),
                  decoration: const BoxDecoration(
                    color: Colors.white,
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text(
                        "Color",
                        style: TextStyle(
                            fontWeight: FontWeight.bold, fontSize: 20),
                      ),
                      const SizedBox(
                        height: 10,
                      ),
                      Container(
                        height: 60,
                        child: ListView.builder(
                          scrollDirection: Axis.horizontal,
                          itemCount: colors.length,
                          itemBuilder: (context, index) {
                            return GestureDetector(
                              onTap: () {
                                setState(() {
                                  _selectedColor = index;
                                });
                              },
                              child: AnimatedContainer(
                                duration: const Duration(milliseconds: 300),
                                margin: const EdgeInsets.only(right: 10),
                                decoration: BoxDecoration(
                                    color: _selectedColor == index
                                        ? colors[index]
                                        : colors[index].withOpacity(0.5),
                                    shape: BoxShape.circle),
                                width: 40,
                                height: 40,
                                child: Center(
                                  child: _selectedColor == index
                                      ? const Icon(
                                          Icons.check,
                                          color: Colors.white,
                                        )
                                      : Container(),
                                ),
                              ),
                            );
                          },
                        ),
                      ),
                      const SizedBox(
                        height: 20,
                      ),
                      const Text(
                        "Size",
                        style: TextStyle(
                            fontWeight: FontWeight.bold, fontSize: 20),
                      ),
                      const SizedBox(
                        height: 10,
                      ),
                      Container(
                        height: 60,
                        child: ListView.builder(
                          scrollDirection: Axis.horizontal,
                          itemCount: size.length,
                          itemBuilder: (context, index) {
                            return GestureDetector(
                              onTap: () {
                                setState(() {
                                  _selectedSize = index;
                                });
                              },
                              child: AnimatedContainer(
                                duration: const Duration(milliseconds: 500),
                                margin: const EdgeInsets.only(right: 10),
                                decoration: BoxDecoration(
                                    color: _selectedSize == index
                                        ? Color.fromRGBO(37, 99, 235, 7)
                                        : Colors.grey.shade200,
                                    shape: BoxShape.circle),
                                width: 40,
                                height: 40,
                                child: Center(
                                  child: Text(
                                    size[index],
                                    style: TextStyle(
                                        color: _selectedSize == index
                                            ? Colors.white
                                            : Colors.black,
                                        fontSize: 15),
                                  ),
                                ),
                              ),
                            );
                          },
                        ),
                      ),
                      const SizedBox(
                        height: 20,
                      ),
                      button('Add to Favorite', () {
                        Navigator.pop(context);

                        // Let's show a snackbar when an item is added to the cart
                        final snackbar = SnackBar(
                          content: const Text("Item added to Favorite"),
                          duration: const Duration(seconds: 5),
                          action: SnackBarAction(
                            label: 'Undo',
                            onPressed: () {},
                          ),
                        );

                        ScaffoldMessenger.of(context).showSnackBar(snackbar);
                      })
                    ],
                  ),
                );
              },
            ));
  }

  button(String text, Function onPressed) {
    return MaterialButton(
      onPressed: () => onPressed(),
      height: 50,
      elevation: 0,
      splashColor: Color.fromRGBO(37, 99, 235, 7),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
      color: Color.fromRGBO(37, 99, 235, 7),
      child: Center(
        child: Text(
          text,
          style: const TextStyle(color: Colors.white, fontSize: 18),
        ),
      ),
    );
  }
}

// ignore_for_file: prefer_const_constructors, prefer_interpolation_to_compose_strings, prefer_const_literals_to_create_immutables

import 'package:flutter/widgets.dart';
import 'package:testv1/models/product.dart';
import 'package:flutter/material.dart';

class ProductViewPage extends StatefulWidget {
  final Product product;
  const ProductViewPage({Key? key, required this.product}) : super(key: key);

  @override
  _ProductViewPageState createState() => _ProductViewPageState();
}

class _ProductViewPageState extends State<ProductViewPage> {
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
    Colors.orange.shade200,
    Colors.blueGrey,
    Color(0xFFFFC1D9),
  ];

  int _selectedColor = 0;
  int _selectedSize = 1;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: CustomScrollView(slivers: [
        SliverAppBar(
          expandedHeight: MediaQuery.of(context).size.height * 0.5,
          elevation: 0,
          snap: true,
          floating: true,
          stretch: true,
          backgroundColor: Colors.grey.shade50,
          flexibleSpace: FlexibleSpaceBar(
              stretchModes: [
                StretchMode.blurBackground,
              ],
              background: Image.network(
                "http://localhost:9900/images?id=" + widget.product.image,
                fit: BoxFit.cover,
              )),
          bottom: PreferredSize(
              preferredSize: Size.fromHeight(45),
              child: Transform.translate(
                offset: Offset(0, 1),
                child: Container(
                  height: 45,
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.only(
                      topLeft: Radius.circular(30),
                      topRight: Radius.circular(30),
                    ),
                  ),
                  child: Center(
                      child: Container(
                    width: 50,
                    height: 8,
                    decoration: BoxDecoration(
                      color: Colors.grey.shade300,
                      borderRadius: BorderRadius.circular(10),
                    ),
                  )),
                ),
              )),
        ),
        SliverList(
            delegate: SliverChildListDelegate([
          Container(
              height: MediaQuery.of(context).size.height * 0.6,
              color: Colors.white,
              padding: EdgeInsets.symmetric(horizontal: 20, vertical: 5),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Container(
                            child: Text(
                              breakText(widget.product.title, 30),
                              maxLines: 1,
                              style: TextStyle(
                                color: Colors.black,
                                fontSize: 22,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                          ),
                          Text(
                            "\$ " + widget.product.price.toString() + '.00',
                            style: TextStyle(
                                color: Colors.black,
                                fontSize: 16,
                                fontWeight: FontWeight.bold),
                          ),
                          SizedBox(
                            height: 5,
                          ),
                          Text(
                            " widget.product.description",
                            style: TextStyle(
                              color: Color.fromRGBO(37, 99, 235, 7),
                              fontSize: 14,
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),
                  SizedBox(
                    height: 20,
                  ),
                  Text(
                    widget.product.description,
                    style: TextStyle(
                      height: 1.5,
                      color: Colors.grey.shade800,
                      fontSize: 15,
                    ),
                  ),
                  SizedBox(
                    height: 30,
                  ),
                  Text(
                    "Color",
                    style: TextStyle(color: Colors.grey.shade400, fontSize: 18),
                  ),
                  SizedBox(
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
                            duration: Duration(milliseconds: 300),
                            margin: EdgeInsets.only(right: 10),
                            decoration: BoxDecoration(
                                color: _selectedColor == index
                                    ? colors[index]
                                    : colors[index].withOpacity(0.5),
                                shape: BoxShape.circle),
                            width: 40,
                            height: 40,
                            child: Center(
                              child: _selectedColor == index
                                  ? Icon(
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
                  SizedBox(
                    height: 20,
                  ),
                  Text(
                    'Size',
                    style: TextStyle(color: Colors.grey.shade400, fontSize: 18),
                  ),
                  SizedBox(
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
                            duration: Duration(milliseconds: 500),
                            margin: EdgeInsets.only(right: 10),
                            decoration: BoxDecoration(
                                color: _selectedSize == index
                                    ? Color.fromRGBO(37, 99, 235, 10)
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
                  SizedBox(
                    height: 10,
                  ),
                  MaterialButton(
                    onPressed: () {
                      Navigator.pop(context);
                    },
                    height: 50,
                    elevation: 0,
                    splashColor: Color.fromRGBO(37, 99, 235, 10),
                    shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(10)),
                    color: Color.fromRGBO(37, 99, 235, 10),
                    child: Center(
                      child: Text(
                        "Add to Cart",
                        style: TextStyle(color: Colors.white, fontSize: 18),
                      ),
                    ),
                  )
                ],
              ))
        ])),
      ]),
    );
  }

  String breakText(String text, int breakLength) {
    if (text.length <= breakLength) {
      return text;
    }

    String firstLine = text.substring(0, breakLength);
    String remainingText = text.substring(breakLength);

    return '$firstLine\n$remainingText';
  }
}

import 'package:flutter/material.dart';
import 'package:simple_animations/simple_animations.dart';

class FadeAnimation extends StatelessWidget {
  final double delay;
  final Widget child;

  FadeAnimation(this.delay, this.child);

  @override
  Widget build(BuildContext context) {
    // final tween = MultiTrackTween([
    //   Track("opacity").add(Duration(milliseconds: 500), Tween(begin: 0.0, end: 1.0)),
    //   Track("translateY").add(
    //     Duration(milliseconds: 500), Tween(begin: -30.0, end: 0.0),
    //     curve: Curves.easeOut)
    // ]);

    return PlayAnimationBuilder(
      delay: Duration(milliseconds: (500 * delay).round()),
      duration: const Duration(milliseconds: 500),
      tween: Tween(begin: 0.0, end: 1.0),
      child: child,
      builder: (context, child, value) => Opacity(
        opacity: 0.75, // Use the animation value directly
        child: Transform.translate(
          offset: Offset(0, 4 * 5), // Adjust with your desired translation
          child: value,
        ),
      ),
    );
  }
}

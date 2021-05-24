package cn.apilabs.gx.dependence;

/**
 * 依赖关系
 *
 * @author zhangkai
 * @version 1.0
 * @date 2021/5/11
 * @className Dependence
 */
public class Dependence {
}


class Driver {
    public void drive(Car car) {
        car.move();
    }
}

class Car {
    public void move() {
        System.out.println("moving");
    }
}

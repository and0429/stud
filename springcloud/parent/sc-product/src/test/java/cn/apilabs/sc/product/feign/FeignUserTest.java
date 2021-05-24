package cn.apilabs.sc.product.feign;

import cn.apilabs.sc.common.domain.user.User;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

import static org.junit.Assert.*;

@RunWith(SpringRunner.class)
@SpringBootTest
public class FeignUserTest {

    @Autowired
    private FeignUser feignUser;

    @Test
    public void test() {
        final List<User> all = feignUser.findAll();
        assertEquals(1, all.size());
        assertEquals("zhangsan", all.get(0).getUsername());
    }


}
package cn.apilabs.sc.product.feign;

import cn.apilabs.sc.common.domain.user.User;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

/**
 * @author zhangkai
 * @version 1.0
 * @date 2021/5/12
 * @className FeignUser
 */
@FeignClient(value = "sc-user", path = "/user")
public interface FeignUser {

    @GetMapping("/user")
    public List<User> findAll();
}

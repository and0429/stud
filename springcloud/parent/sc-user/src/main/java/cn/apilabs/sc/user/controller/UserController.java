package cn.apilabs.sc.user.controller;

import cn.apilabs.sc.common.domain.user.User;
import cn.apilabs.sc.user.properties.AppProperties;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.List;

/**
 * @author zhangkai
 * @version 1.0
 * @date 2021/5/12
 * @className UserController
 */
@RestController
@RefreshScope
@RequestMapping("/user")
public class UserController {

    private final AppProperties appProperties;

    public UserController(AppProperties appProperties) {
        this.appProperties = appProperties;
    }

    @GetMapping("/test")
    public AppProperties test() {
        return appProperties;
    }

    @GetMapping
    public List<User> findAll() {
        User u = new User();
        u.setUsername("zhangsan");
        u.setAge(400);
        return Collections.singletonList(u);
    }

}

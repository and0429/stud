package cn.apilabs.sc.user.properties;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

/**
 * @author zhangkai
 * @version 1.0
 * @date 2021/5/12
 * @className AppProperties
 */
@Component
@ConfigurationProperties(prefix = "app")
public class AppProperties {

    private String name;
    private String age;
    private boolean isOld;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAge() {
        return age;
    }

    public void setAge(String age) {
        this.age = age;
    }

    public boolean isOld() {
        return isOld;
    }

    public void setOld(boolean old) {
        isOld = old;
    }
}

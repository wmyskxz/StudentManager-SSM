package cn.wmyskxz.controller;

import javax.servlet.http.HttpSession;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.IncorrectCredentialsException;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class LoginController {
	
	@RequestMapping("/login")
	public String Login(String username, String password, HttpSession session, Model model) {
		if(username==null) {
			return "login";
		}
		//System.out.println(password);
		//System.out.println("调试");
		Subject subject=SecurityUtils.getSubject();
		UsernamePasswordToken token=new UsernamePasswordToken(username,password);
		System.out.println(token.getPassword());
		//System.out.println(token);
		try {
			subject.login(token);
		} catch (UnknownAccountException e) {
       	 System.out.println( "登陆出错");
         model.addAttribute("message", "登陆出错");
         return "index";
     }catch (IncorrectCredentialsException ex) {
     	 System.out.println( "用户名和密码不匹配");
     	return "index";
     }catch (AuthenticationException e) {
     	 System.out.println( "其他的登陆错误");
	        	return "index";
     	
     }

				return "index";
		
	}

}

package cn.wmyskxz.login;

import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authc.credential.HashedCredentialsMatcher;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.crypto.hash.Md5Hash;
import org.apache.shiro.crypto.hash.SimpleHash;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.apache.shiro.util.ByteSource;
import org.springframework.beans.factory.annotation.Autowired;

import cn.wmyskxz.entity.User;
import cn.wmyskxz.service.UserService;

public class MyRealm extends AuthorizingRealm{
	 @Autowired
	    private UserService userService;    
	   //String password;
	    public void setUserService(UserService userService) {
	    	this.userService= userService;
	    }
	    public UserService getUserService() {
	    	return this. userService;
	    }
	    public void setCredentialMatcher(){
	        HashedCredentialsMatcher  credentialsMatcher = new HashedCredentialsMatcher();    
	        credentialsMatcher.setHashAlgorithmName("MD5");//MD5算法加密
	        credentialsMatcher.setHashIterations(1024);//1024次循环加密      
	        setCredentialsMatcher(credentialsMatcher);
	    }
		@Override
		protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals) {
			// TODO Auto-generated method stub
			SimpleAuthorizationInfo info=new SimpleAuthorizationInfo();
			Object userName=principals.getPrimaryPrincipal();
			String role= userService.getRoleByName((String)userName);
			System.out.println(role);
			if(role.equals("admin")) {
				info.addRole("admin");
			}
			if(role.equals("student")) {
				info.addRole("student");
			}
			info.addRole("all");
			return info;
		}
		@Override
		protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken token) throws AuthenticationException {
			// TODO Auto-generated method stub
			//1. token 中获取登录的 username! 注意不需要获取password.
			//System.out.println("是否调用该方法");
			Object principal=token.getPrincipal();
			
			//System.out.println((String)principal);
			User user= userService.findByName((String)principal);
			//System.out.println(user);
			 //2. 利用 username 查询数据库得到用户的信息. 
			String password=null;
			if(user!=null) {
				password=user.getPassword();
			}
			System.out.println(password);
			//设置盐值 ，（加密的调料，让加密出来的东西更具安全性，一般是通过数据库查询出来的。 
			//简单的说，就是把密码根据特定的东西而进行动态加密，如果别人不知道你的盐值，就解不出你的密码）
			String salt="abcdef";
			ByteSource source=new Md5Hash(salt);
			//当前 Realm 的name
			String realmName=getName();
			SimpleAuthenticationInfo info=new SimpleAuthenticationInfo
					(principal,password,source,realmName);
			System.out.println(info);
			return info;
		}
		
			 public static void main(String[] args) {
				 String pass="123456";
				 String saltSource = "abcdef";    
				 String hashAlgorithmName = "MD5";
				 Object salt = new Md5Hash(saltSource);
				 int hashIterations = 1024;    
				 Object result = new SimpleHash(hashAlgorithmName, pass, salt, hashIterations);
				 String password = result.toString();
				 System.out.println(password);
		    }


}

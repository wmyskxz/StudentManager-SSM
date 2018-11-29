package cn.wmyskxz.entity;

import java.io.Serializable;

import org.springframework.stereotype.Component;

@Component
public class User implements Serializable{
	 private int id;
	    private String username;
	    private String password;
	    public User() {
	        super();
	    }
	    public User(int id, String account, String password) {
	        this.id = id;
	        this.username =username;
	        this.password = password;
	    }
		public int getId() {
			return id;
		}
		public void setId(int id) {
			this.id = id;
		}
		public String getAccount() {
			return username;
		}
		public void setAccount(String account) {
			this.username = account;
		}
		public String getPassword() {
			return password;
		}
		public void setPassword(String password) {
			this.password = password;
		}
		
		    public String toString() {
		        return "UserPojo{" +
		                "id=" + id +
		                ", username='" + username + '\'' +
		                ", password='" + password + '\'' +
		                '}';
		    }
}

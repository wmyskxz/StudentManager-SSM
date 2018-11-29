package cn.wmyskxz.entity;

public class Role {
	int id;
	String role;
	String url;
	String permission;
	public Role() {
		super();
	}
	public Role(int id,String role,String url,String permission) {
		this.id=id;
		this.role=role;
		this.permission=permission;
		this.url=url;
	}
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	public String getPermission() {
		return permission;
	}
	public void setPermission(String permission) {
		this.permission = permission;
	}

}

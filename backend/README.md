# VMall 后端（Spring Boot）
基于 Spring Boot 的商城后端，提供商品、分类、用户、购物车、订单等接口，可直接供前端调用。

## 目录说明
- `com.vmall.controller`：REST 接口（用户、商品、购物车、订单、分类）与全局异常处理。
- `com.vmall.dto`：请求/响应 DTO、统一响应包装 `ApiResponse`，以及实体转换工具 `DtoMapper`。
- `com.vmall.model`：JPA 实体与枚举（商品、分类、用户、购物车项、订单、订单项、订单状态等）。
- `com.vmall.repository`：Spring Data JPA 仓储接口。
- `com.vmall.service`：业务接口与 `impl` 实现（库存校验、购物车合并、下单扣减库存等）。
- `src/main/resources`：`application.yml` 配置、`db/schema.sql` 与 `db/data.sql` 初始化脚本。
- `com.vmall.config.WebConfig`：跨域配置，默认放开 `/api/**`。

## 环境要求
- JDK 17+
- Maven 3.9+
- MySQL 8.x（默认连接 `vmall` 数据库，账号/密码见 `src/main/resources/application.yml`，可自行修改）

## 初始化数据库
```bash
# 创建库和表并写入示例数据
mysql -u root -p < backend/src/main/resources/db/schema.sql
mysql -u root -p < backend/src/main/resources/db/data.sql
```
如需单独创建数据库账号：
```sql
CREATE USER 'vmall'@'%' IDENTIFIED BY 'vmall123';
GRANT ALL PRIVILEGES ON vmall.* TO 'vmall'@'%';
FLUSH PRIVILEGES;
```

## 启动
```bash
cd backend
mvn spring-boot:run
```
服务默认监听 `http://localhost:8080`。若数据库连接失败，请检查 `application.yml` 的 JDBC 地址与账号密码。

## 响应规范
所有接口返回统一格式：
```json
{
  "success": true,
  "message": "ok",
  "data": { ... }
}
```
参数校验/业务异常：`success=false` 且 HTTP 400；未捕获异常：HTTP 500。

## 接口列表
- 用户
  - `POST /api/users/register` `{username,email,password,phone,address}` → 注册
  - `POST /api/users/login` `{email,password}` → 登录（示例为明文，生产需加密 + Token）
  - `GET /api/users/{id}` → 查询用户信息
- 商品/分类
  - `GET /api/products?categoryId=&keyword=` → 商品列表（按分类和关键词过滤）
  - `GET /api/products/{id}` → 商品详情
  - `GET /api/categories` → 分类列表
- 购物车（均需 `userId` 路径参数）
  - `GET /api/users/{userId}/cart` → 查看购物车
  - `POST /api/users/{userId}/cart` `{productId,quantity}` → 加入购物车（合并数量并校验库存）
  - `PUT /api/users/{userId}/cart/{itemId}` `{quantity}` → 修改数量
  - `DELETE /api/users/{userId}/cart/{itemId}` → 删除单个条目
  - `DELETE /api/users/{userId}/cart` → 清空购物车
- 订单（需 `userId` 路径参数）
  - `POST /api/users/{userId}/orders` → 从购物车生成订单（扣减库存，清空购物车）
  - `GET /api/users/{userId}/orders` → 订单列表（按创建时间倒序）

## 示例请求
```bash
# 注册
curl -X POST http://localhost:8080/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"username":"demo2","email":"demo2@vmall.com","password":"demo123","phone":"13800000001","address":"Shenzhen"}'

# 登录
curl -X POST http://localhost:8080/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"demo@vmall.com","password":"demo123"}'

# 获取商品列表（按分类+关键词）
curl "http://localhost:8080/api/products?categoryId=1&keyword=nova"

# 加入购物车并下单
curl -X POST http://localhost:8080/api/users/1/cart \
  -H "Content-Type: application/json" \
  -d '{"productId":1,"quantity":2}'
curl -X POST http://localhost:8080/api/users/1/orders
```

## 说明与后续
- 密码目前为明文存储，生产请加密并接入登录态/Token。
- `spring.sql.init.mode=always` 会在启动时执行 `schema.sql`/`data.sql`，如不需重复初始化可在 `application.yml` 调整。
- 跨域策略位于 `com.vmall.config.WebConfig`，如需限制来源可在此处修改。

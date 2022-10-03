# Product Page Views App

### App Installation


- Add the Collections app to your theme's manifest.json file inside `dependencies` as shown below:
 ```
  "dependencies": {
   "vtexeurope.product-views": "0.x"
  }
```

### Schema Installation
This application uses two masterdata schemas that must be created manually.
To do that you need to make two `POST` requests
----------
*SchemaEntity*: **ProductViews**  
*SchemaName*: **product_views_v1**  
*Request URL*: `http://{{account}}.vtexcommercestable.com.br/api/dataentities/ProductViews/schemas/product_views_v1`  

**Body**
```
{
  "properties": {
    "views": { "type": "number" },
    "productId": { "type": "string" },
    "date": { "type": "string" }
  },
  "v-default-fields": ["id", "views", "productId", "date"],
  "required": [ "views", "productId", "date" ],
  "v-indexed": [ "views", "productId", "date" ],
  "v-security": {
    "allowGetAll": true,
    "publicRead": [ "id", "views", "productId", "date" ],
    "publicWrite": [ "id", "views", "productId", "date" ],
    "publicFilter": [ "id", "views", "productId", "date" ]
  }
}

```

----------
*SchemaEntity*: **ProductViewsSessions**  
*SchemaName*: **product_views_sessions_v1**  
*Request URL*: `http://{{account}}.vtexcommercestable.com.br/api/dataentities/ProductViewsSessions/schemas/product_views_sessions_v1`  

**Body**
```
{
  "properties": {
    "sessionId": { "type": "string" },
    "productId": { "type": "string" },
    "date": { "type": "string" }
  },
  "v-default-fields": ["id", "sessionId", "productId", "date"],
  "required": [ "sessionId", "productId", "date" ],
  "v-indexed": [ "sessionId", "productId", "date" ],
  "v-security": {
    "allowGetAll": true,
    "publicRead": [ "id", "sessionId", "productId", "date" ],
    "publicWrite": [ "id", "sessionId", "productId", "date" ],
    "publicFilter": [ "id", "sessionId", "productId", "date" ]
  }
}

```

Follow the official documentation for more information: https://developers.vtex.com/vtex-rest-api/reference/schemas

### Usage

Add the `"product-views"` block into your template.

```
"children": [
  ...
  "product-views",
  ...
]

....

"product-views": {
    "props": {
        "period": "month",
        "displayIcon": true,
        "iconSize": 16,
        "iconColor": "#ff0000",
        "blockClass": "someClass"
    }
}
```

### Props

| Name | Required | Type | Default | Description |
| --- | --- | --- | --- | --- |
|`period`| No | `string` | `month` | Possible values `day`, `week` or `month` |
|`displayIcon`| No | `boolean` | `true` | Determine if the eye icon will appear or not |
|`iconSize`| No | `number` | `16` | Icon size |
|`iconColor`| No | `string` | `#000000` | HEX Value for icon color |



### Css Classes

|Class name|
|---|
|`productViewsContainer`|

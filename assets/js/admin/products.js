var AdminProducts;AdminProducts=function(){function t(t){this.params=t,jQuery(".product-featured").on("click",this.featureProduct)}return t.prototype.params={i18n:{saved:"",confirm_remove:"",attribute_removed:""}},t.prototype.featureProduct=function(t){var r;return t.preventDefault(),r=jQuery(t.target).closest("a.product-featured"),jQuery.ajax({url:jigoshop.getAjaxUrl(),type:"post",dataType:"json",data:{action:"jigoshop.admin.products.feature_product",product_id:r.data("id")}}).done(function(t){return null!=t.success&&t.success?jQuery("span",r).toggleClass("glyphicon-star").toggleClass("glyphicon-star-empty"):jigoshop.addMessage("danger",t.error,6e3)})},t}(),jQuery(function(){return new AdminProducts(jigoshop_admin_products)});
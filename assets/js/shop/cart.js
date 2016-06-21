var Cart,bind=function(t,e){return function(){return t.apply(e,arguments)}},hasProp={}.hasOwnProperty;Cart=function(){function t(t){this.params=t,this.updateDiscounts=bind(this.updateDiscounts,this),this.updateQuantity=bind(this.updateQuantity,this),this.removeItem=bind(this.removeItem,this),this._updateShippingField=bind(this._updateShippingField,this),this.updatePostcode=bind(this.updatePostcode,this),this.updateState=bind(this.updateState,this),this.updateCountry=bind(this.updateCountry,this),this.selectShipping=bind(this.selectShipping,this),this.block=bind(this.block,this),jQuery("#cart").on("change",".product-quantity input",this.updateQuantity).on("click",".product-remove a",this.removeItem),jQuery("#shipping-calculator").on("click","#change-destination",this.changeDestination).on("click",".close",this.changeDestination).on("click","input[type=radio]",this.selectShipping).on("change","#country",this.updateCountry).on("change","#state",this.updateState.bind(this,"#state")).on("change","#noscript_state",this.updateState.bind(this,"#noscript_state")).on("change","#postcode",this.updatePostcode),jQuery("input#jigoshop_coupons").on("change",this.updateDiscounts).select2({tags:[],tokenSeparators:[","],multiple:!0,formatNoMatches:""})}return t.prototype.params={assets:"",i18n:{loading:"Loading..."}},t.prototype.block=function(){return jQuery("#cart").block({message:'<img src="'+this.params.assets+'/images/loading.gif" alt="'+this.params.i18n.loading+'" width="15" height="15" />',css:{padding:"5px",width:"auto",height:"auto",border:"1px solid #83AC31"},overlayCSS:{backgroundColor:"rgba(255, 255, 255, .8)"}})},t.prototype.unblock=function(){return jQuery("#cart").unblock()},t.prototype.changeDestination=function(t){return t.preventDefault(),jQuery("#shipping-calculator td > div").slideToggle(),jQuery("#change-destination").slideToggle(),!1},t.prototype.selectShipping=function(){var t,e;return t=jQuery("#shipping-calculator input[type=radio]:checked"),e=jQuery(".shipping-method-rate",t.closest("li")),jQuery.ajax({url:jigoshop.getAjaxUrl(),type:"post",dataType:"json",data:{action:"jigoshop_cart_select_shipping",method:t.val(),rate:e.val()}}).done(function(t){return function(e){return e.success?(t._updateTotals(e.html.total,e.html.subtotal),t._updateTaxes(e.tax,e.html.tax)):jigoshop.addMessage("danger",e.error,6e3)}}(this))},t.prototype.updateCountry=function(){return this.block(),jQuery(".noscript_state_field").remove(),jQuery.ajax({url:jigoshop.getAjaxUrl(),type:"post",dataType:"json",data:{action:"jigoshop_cart_change_country",value:jQuery("#country").val()}}).done(function(t){return function(e){var a,i,o,s;if(null!=e.success&&e.success)if(jQuery("#shipping-calculator th p > span").html(e.html.estimation),t._updateTotals(e.html.total,e.html.subtotal),t._updateDiscount(e),t._updateTaxes(e.tax,e.html.tax),t._updateShipping(e.shipping,e.html.shipping),e.has_states){a=[],o=e.states;for(s in o)hasProp.call(o,s)&&(i=o[s],a.push({id:s,text:i}));jQuery("#state").select2({data:a})}else jQuery("#state").attr("type","text").select2("destroy").val("");else jigoshop.addMessage("danger",e.error,6e3);return t.unblock()}}(this))},t.prototype.updateState=function(t){return this._updateShippingField("jigoshop_cart_change_state",jQuery(t).val())},t.prototype.updatePostcode=function(){return this._updateShippingField("jigoshop_cart_change_postcode",jQuery("#postcode").val())},t.prototype._updateShippingField=function(t,e){return this.block(),jQuery.ajax({url:jigoshop.getAjaxUrl(),type:"post",dataType:"json",data:{action:t,value:e}}).done(function(t){return function(e){return null!=e.success&&e.success?(jQuery("#shipping-calculator th p > span").html(e.html.estimation),t._updateTotals(e.html.total,e.html.subtotal),t._updateDiscount(e),t._updateTaxes(e.tax,e.html.tax),t._updateShipping(e.shipping,e.html.shipping)):jigoshop.addMessage("danger",e.error,6e3),t.unblock()}}(this))},t.prototype.removeItem=function(t){var e;return t.preventDefault(),e=jQuery(t.target).closest("tr"),jQuery(".product-quantity",e).val(0),this.updateQuantity(t)},t.prototype.updateQuantity=function(t){var e;return e=jQuery(t.target).closest("tr"),this.block(),jQuery.ajax({url:jigoshop.getAjaxUrl(),type:"post",dataType:"json",data:{action:"jigoshop_cart_update_item",item:e.data("id"),quantity:jQuery(t.target).val()}}).done(function(t){return function(a){var i,o;if(a.success===!0){if(null!=a.empty_cart==!0)return o=jQuery(a.html).hide(),i=jQuery("#cart"),i.after(o),i.slideUp(),o.slideDown(),void t.unblock();null!=a.remove_item==!0?e.remove():jQuery(".product-subtotal",e).html(a.html.item_subtotal),jQuery("td#product-subtotal").html(a.html.product_subtotal),t._updateTotals(a.html.total,a.html.subtotal),t._updateDiscount(a),t._updateTaxes(a.tax,a.html.tax),t._updateShipping(a.shipping,a.html.shipping)}else jigoshop.addMessage("danger",a.error,6e3);return t.unblock()}}(this))},t.prototype.updateDiscounts=function(t){var e;return e=jQuery(t.target),this.block(),jQuery.ajax({url:jigoshop.getAjaxUrl(),type:"post",dataType:"json",data:{action:"jigoshop_cart_update_discounts",coupons:e.val()}}).done(function(t){return function(e){var a,i;if(null!=e.success&&e.success){if(null!=e.empty_cart==!0)return i=jQuery(e.html).hide(),a=jQuery("#cart"),a.after(i),a.slideUp(),i.slideDown(),void t.unblock();jQuery("td#product-subtotal").html(e.html.product_subtotal),t._updateTotals(e.html.total,e.html.subtotal),t._updateDiscount(e),t._updateTaxes(e.tax,e.html.tax),t._updateShipping(e.shipping,e.html.shipping)}else jigoshop.addMessage("danger",e.error,6e3);return t.unblock()}}(this))},t.prototype._updateTotals=function(t,e){return jQuery("#cart-total > td").html(t),jQuery("#cart-subtotal > td").html(e)},t.prototype._updateDiscount=function(t){var e;return null!=t.coupons&&(jQuery("input#jigoshop_coupons").select2("val",t.coupons.split(",")),e=jQuery("tr#cart-discount"),t.discount>0?(jQuery("td",e).html(t.html.discount),e.show()):e.hide(),null!=t.html.coupons)?jigoshop.addMessage("warning",t.html.coupons):void 0},t.prototype._updateShipping=function(t,e){var a,i,o,s;for(o in t)hasProp.call(t,o)&&(s=t[o],i=jQuery(".shipping-"+o),i.addClass("existing"),i.length>0?s>-1?(a=jQuery(e[o].html).addClass("existing"),i.replaceWith(a)):i.slideUp(function(){return jQuery(this).remove()}):null!=e[o]&&(a=jQuery(e[o].html),a.hide().addClass("existing").appendTo(jQuery("#shipping-methods")).slideDown()));return jQuery("#shipping-methods > li:not(.existing)").slideUp(function(){return jQuery(this).remove()}),jQuery("#shipping-methods > li").removeClass("existing")},t.prototype._updateTaxes=function(t,e){var a,i,o,s;i=[];for(s in e)hasProp.call(e,s)&&(o=e[s],a=jQuery("#tax-"+s),jQuery("th",a).html(o.label),jQuery("td",a).html(o.value),t[s]>0?i.push(a.show()):i.push(a.hide()));return i},t}(),jQuery(function(){return new Cart(jigoshop_cart)});
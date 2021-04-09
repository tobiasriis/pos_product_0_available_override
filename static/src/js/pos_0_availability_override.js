alert("HELLO")
odoo.define('point_of_sale.models_0_stock_override', function (require) {
    "use strict";

    
    exports.PosModel = Backbone.Model.extend({
        models: [
        {
            model:  'product.product',
            // todo remove list_price in master, it is unused
            fields: ['display_name', 'list_price', 'lst_price', 'standard_price', 'categ_id', 'pos_categ_id', 'taxes_id',
                     'barcode', 'default_code', 'to_weight', 'uom_id', 'description_sale', 'description',
                     'product_tmpl_id','tracking'],
            order:  _.map(['sequence','default_code','name'], function (name) { return {name: name}; }),
            domain: [['sale_ok','=',true],['available_in_pos','=',true],['qty_available', '>', 0]], // this is
            context: function(self){ return { display_default_code: false }; },
            loaded: function(self, products){
                var using_company_currency = self.config.currency_id[0] === self.company.currency_id[0];
                var conversion_rate = self.currency.rate / self.company_currency.rate;
                self.db.add_products(_.map(products, function (product) {
                    if (!using_company_currency) {
                        product.lst_price = round_pr(product.lst_price * conversion_rate, self.currency.rounding);
                    }
                    product.categ = _.findWhere(self.product_categories, {'id': product.categ_id[0]});
                    return new exports.Product({}, product);
                }));
            },
        },
        //This is custom made code, made to add functionality for Parafusos Express.
        {
            model:  'product.product',
            // Products that are out of stock should be shown in the POS interface, but their price should be hidden
            fields: ['display_name', 'categ_id', 'pos_categ_id', 'taxes_id',
            'barcode', 'default_code', 'uom_id', 'description_sale', 'description',
            'product_tmpl_id','tracking'],
            order:  _.map(['sequence','default_code','name'], function (name) { return {name: name}; }),
            domain: [['sale_ok','=',true],['available_in_pos','=',true],['qty_available', '=', 0]],
            context: function(self){ return { display_default_code: false }; },
            loaded: function(self, products){
                var using_company_currency = self.config.currency_id[0] === self.company.currency_id[0];
                var conversion_rate = self.currency.rate / self.company_currency.rate;
                self.db.add_products(_.map(products, function (product) {
                    if (!using_company_currency) {
                        product.lst_price = round_pr(product.lst_price * conversion_rate, self.currency.rounding);
                    }
                    product.categ = _.findWhere(self.product_categories, {'id': product.categ_id[0]});
                    return new exports.Product({}, product);
                }));
            },
        },
    
        ],
    
    
        
    
    });
    
    
    // An orderline represent one element of the content of a client's shopping cart.
    // An orderline contains a product, its quantity, its price, discount. etc. 
    // An Order contains zero or more Orderlines.
    
    
    // An order more or less represents the content of a client's shopping cart (the OrderLines) 
    // plus the associated payment information (the Paymentlines) 
    // there is always an active ('selected') order in the Pos, a new one is created
    // automaticaly once an order is completed and sent to the server.
    
    /*
     The numpad handles both the choice of the property currently being modified
     (quantity, price or discount) and the edition of the corresponding numeric value.
     */
    
    });
    
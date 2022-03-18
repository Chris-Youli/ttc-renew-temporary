$(function () {

    var stripe = Stripe('pk_test_E1z8Bu15MYOOPyWRigo1gjLk00ULMn11wW');
    // var checkoutButton = document.getElementById('checkout-button');
    var checkoutButton = $('#checkout-button');



    var uiStorage = {

        ttcPlanCards: $(".ttc-renew-plan-card-wrapper"),

        checkoutPanelPackageName: $("#ttc-renew-checkout-package-name"),
        checkoutPanelBillingFrequencyToggle: $("#ttc-renew-billing-frequency-toggle"),
        checkoutPanelBillingFrequencyToggleDot: $("#ttc-renew-billing-frequency-toggle-dot"),
        checkoutPanelPackageBasePrice: $("#ttc-renew-checkout-base-price"),

        checkoutPanelJournalLabel: $("#ttc-renew-journal-label"),
        checkoutPanelExtraAmount: $("#ttc-renew-checkout-extra-amount"),
        checkoutPanelTotal: $("#ttc-renew-checkout-total"),
        checkoutPanelBillingPeriod: $("#ttc-checkout-billing-period-label"),
        checkoutPanelTotalAmountCharge: $('#ttc-renew-checkout-total-amount-charge'),

        packageCardPriceIndividual:$("#ttc-renew-card-price-individual"),
        packageCardPriceSmall:$("#ttc-renew-card-price-small"),
        packageCardPriceMedium:$("#ttc-renew-card-price-medium"),
        packageCardPriceLarge:$("#ttc-renew-card-price-large"),

        packageCardPerExtraSmall:$("#ttc-renew-card-per-extra-small"),
        packageCardPerExtraMedium:$("#ttc-renew-card-per-extra-medium"),
        packageCardPerExtraLarge:$("#ttc-renew-card-per-extra-large"),
        
        packageCardExtraSelector: $(".ttc-renew-number-login-selector"),

        packageCardBillingFrequencyText: $(".billing-frequency-text-info"),

        
        

                
        
        packageCardExtraSelectorSmall: $("#ttc-renew-field-extra-small"),
        packageCardExtraSelectorMedium: $("#ttc-renew-field-extra-medium"),
        packageCardExtraSelectorLarge: $("#ttc-renew-field-extra-large")

    }

    var selectedPlanOptions = {
        individual: "ttc-plan-individual",
        small: "ttc-plan-small",
        medium: "ttc-plan-medium",
        large: "ttc-plan-large"
    }

    var selectedPlanLabel = {
        individual: "individual",
        small: "small",
        medium: "medium",
        large: "large"
    }

    var subscriptionBaseCost = {
        individualMonthly: 16.50,
        smallMonthly: 37,
        mediumMonthly: 69,
        largeMonthly: 184,

        individualAnnual: 180,
        smallAnnual: 400,
        mediumAnnual: 750,
        largeAnnual: 2000
    }

    var subscriptionExtraCost = {
        
        smallMonthly: 4,
        mediumMonthly: 7,
        largeMonthly: 18,

        smallAnnual: 40,
        mediumAnnual: 75,
        largeAnnual: 200
    }

    var selectedNumberOfExtras = 0;

    var checkoutPanelJournalText = {
        withJournal: "Free w/ Annual Subscription",
        withoutJournal: "Not Included"
    }

    var stripeCheckoutPriceCode = {
        individualBaseMonthly: "price_1KdnMzLGwAXHXsFBEaXvSUPQ",
        smallBaseMonthly: "price_1KdnMzLGwAXHXsFBgV12ao5y",
        mediumBaseMonthly:"price_1KdnMzLGwAXHXsFBAdkprUBz",
        largeBaseMonthly:"price_1KdnMzLGwAXHXsFB0VXE73Fv",

        individualBaseAnnual: "price_1KdnMzLGwAXHXsFBUEcDiZXw",
        smallBaseAnnual: "price_1KdnMzLGwAXHXsFBA8dwvv2m",
        mediumBaseAnnual: "price_1KdnMzLGwAXHXsFBShdUP9py",
        largeBaseAnnual: "price_1KdnMzLGwAXHXsFBcFpRBoll",

        smallExtraMonthly: "price_1KdnQlLGwAXHXsFBFS5HPeCm",
        mediumExtraMonthly:"price_1KdnQlLGwAXHXsFBj6DQwScz",
        largeExtraMonthly:"price_1KdnQlLGwAXHXsFBCLNG9sWV",

        smallExtraAnnual: "price_1KdnQlLGwAXHXsFBwcr0B3II",
        mediumExtraAnnual:"price_1KdnQlLGwAXHXsFBDDzTgiRR",
        largeExtraAnnual:"price_1KdnQlLGwAXHXsFBuz2ha1uo"
    }






    var selectedPlan = selectedPlanOptions.individual;
    var isSwitchedToAnnual = true;




    uiStorage.ttcPlanCards.each(function () {

        $(this).click(function () {
            var ttcPlanCardId = $(this).attr("id");
            // ttcPlanCardSelected(ttcPlanCardId);
            ttcPlanCardSelected(ttcPlanCardId);

        })

    })

    uiStorage.checkoutPanelBillingFrequencyToggle.change(function(){
        var frequencyToggle = uiStorage.checkoutPanelBillingFrequencyToggle;
        var frequencyToggleDot = uiStorage.checkoutPanelBillingFrequencyToggleDot;
        
        if(frequencyToggle.is(':checked')){
            frequencyToggle.prop('checked', true);
            frequencyToggleDot.css({ float: "right" });
            isSwitchedToAnnual = false;

            uiStorage.packageCardPriceIndividual.html(subscriptionBaseCost.individualMonthly);
            uiStorage.packageCardPriceSmall.html(subscriptionBaseCost.smallMonthly);
            uiStorage.packageCardPriceMedium.html(subscriptionBaseCost.mediumMonthly);
            uiStorage.packageCardPriceLarge.html(subscriptionBaseCost.largeMonthly);

            uiStorage.packageCardPerExtraSmall.html(subscriptionExtraCost.smallMonthly);
            uiStorage.packageCardPerExtraMedium.html(subscriptionExtraCost.mediumMonthly);
            uiStorage.packageCardPerExtraLarge.html(subscriptionExtraCost.largeMonthly);

            uiStorage.packageCardBillingFrequencyText.each(function() {
                $(this).html("Your annual commitment billed monthly.");
            });

        }else{
            frequencyToggle.prop('checked', false);
            frequencyToggleDot.css({ float: "left" });
            isSwitchedToAnnual = true;



            uiStorage.packageCardPriceIndividual.html("15");
            uiStorage.packageCardPriceSmall.html("33");
            uiStorage.packageCardPriceMedium.html("62");
            uiStorage.packageCardPriceLarge.html("167");

            uiStorage.packageCardPerExtraSmall.html("3");
            uiStorage.packageCardPerExtraMedium.html("6");
            uiStorage.packageCardPerExtraLarge.html("17");

            uiStorage.packageCardBillingFrequencyText.each(function() {
                $(this).html("Your annual commitment billed annually.");
            });
        }
        updateCheckoutPanel();
    })


    uiStorage.packageCardExtraSelector.each(function (){
        $(this).change(function(){
            var numberSelected = Number($(this).val());
            if(numberSelected >= 0){
                selectedNumberOfExtras = numberSelected;
                
            }else{
                selectedNumberOfExtras = 0;
            }
            updateCheckoutPanel();

        })
        
    })

    var ttcPlanCardSelected = function (ttcPlanCardId) {
        console.log(ttcPlanCardId);

        switch (ttcPlanCardId) {
            case selectedPlanOptions.individual:
                selectedPlan = selectedPlanOptions.individual;
                updatePlanCardStyle();
                updateCheckoutPanel();
                break;

            case selectedPlanOptions.small:
                selectedPlan = selectedPlanOptions.small;
                selectedNumberOfExtras = uiStorage.packageCardExtraSelectorSmall.val();
                updatePlanCardStyle();
                updateCheckoutPanel();
                break;

            case selectedPlanOptions.medium:
                selectedPlan = selectedPlanOptions.medium;
                selectedNumberOfExtras = uiStorage.packageCardExtraSelectorMedium.val();
                updatePlanCardStyle();
                updateCheckoutPanel();
                break;

            case selectedPlanOptions.large:
                selectedPlan = selectedPlanOptions.large;
                selectedNumberOfExtras = uiStorage.packageCardExtraSelectorLarge.val();
                updatePlanCardStyle();
                updateCheckoutPanel();
                break;

        }
    }

    var updatePlanCardStyle = function () {
        uiStorage.ttcPlanCards.each(function () {
            if ($(this).attr("id") === selectedPlan) {
                $(this).css('outline', 'solid 5px #074ee8');
            } else {
                $(this).css('outline', '');
            }
        })
    }

    var updateCheckoutPanel = function() {
        uiStorage.checkoutPanelJournalLabel.html(isSwitchedToAnnual? checkoutPanelJournalText.withJournal : checkoutPanelJournalText.withoutJournal);
        switch (selectedPlan){
            case selectedPlanOptions.individual:
                uiStorage.checkoutPanelPackageName.html(selectedPlanLabel.individual);
                uiStorage.checkoutPanelPackageBasePrice.html(isSwitchedToAnnual? subscriptionBaseCost.individualAnnual: subscriptionBaseCost.individualMonthly);
                uiStorage.checkoutPanelExtraAmount.html(selectedNumberOfExtras); 
                
                var calculateTotalAmount =  calculatedTotal(
                    (isSwitchedToAnnual? subscriptionBaseCost.individualAnnual: subscriptionBaseCost.individualMonthly),
                    (0)
                    ); 
                uiStorage.checkoutPanelTotal.html(calculateTotalAmount);
                uiStorage.checkoutPanelTotalAmountCharge.html(calculateTotalAmount);
                uiStorage.checkoutPanelBillingPeriod.html(isSwitchedToAnnual? "yr": "mth");

                 
                setCheckoutButtonRedirect();
                break;

            case selectedPlanOptions.small:
                uiStorage.checkoutPanelPackageName.html(selectedPlanLabel.small);
                uiStorage.checkoutPanelPackageBasePrice.html(isSwitchedToAnnual? subscriptionBaseCost.smallAnnual: subscriptionBaseCost.smallMonthly);
                uiStorage.checkoutPanelExtraAmount.html(selectedNumberOfExtras);   
                
                var calculateTotalAmount =  calculatedTotal(
                    (isSwitchedToAnnual? subscriptionBaseCost.smallAnnual: subscriptionBaseCost.smallMonthly),
                    (isSwitchedToAnnual? subscriptionExtraCost.smallAnnual: subscriptionExtraCost.smallMonthly)
                    ); 
                uiStorage.checkoutPanelTotal.html(calculateTotalAmount);
                uiStorage.checkoutPanelTotalAmountCharge.html(calculateTotalAmount);

                uiStorage.checkoutPanelBillingPeriod.html(isSwitchedToAnnual? "yr": "mth");

                setCheckoutButtonRedirect();
                break;

            case selectedPlanOptions.medium:
                uiStorage.checkoutPanelPackageName.html(selectedPlanLabel.medium);
                uiStorage.checkoutPanelPackageBasePrice.html(isSwitchedToAnnual? subscriptionBaseCost.mediumAnnual: subscriptionBaseCost.mediumMonthly);
                uiStorage.checkoutPanelExtraAmount.html(selectedNumberOfExtras);  

                var calculateTotalAmount =  calculatedTotal(
                    (isSwitchedToAnnual? subscriptionBaseCost.mediumAnnual: subscriptionBaseCost.mediumMonthly),
                    (isSwitchedToAnnual? subscriptionExtraCost.mediumAnnual: subscriptionExtraCost.mediumMonthly)
                    ); 
                uiStorage.checkoutPanelTotal.html(calculateTotalAmount);  
                uiStorage.checkoutPanelTotalAmountCharge.html(calculateTotalAmount);

                uiStorage.checkoutPanelBillingPeriod.html(isSwitchedToAnnual? "yr": "mth");
                setCheckoutButtonRedirect();
                break;

            case selectedPlanOptions.large:
                uiStorage.checkoutPanelPackageName.html(selectedPlanLabel.large);
                uiStorage.checkoutPanelExtraAmount.html(selectedNumberOfExtras);    
                uiStorage.checkoutPanelPackageBasePrice.html(isSwitchedToAnnual? subscriptionBaseCost.largeAnnual: subscriptionBaseCost.largeMonthly);
                var calculateTotalAmount =  calculatedTotal(
                    (isSwitchedToAnnual? subscriptionBaseCost.largeAnnual: subscriptionBaseCost.largeMonthly),
                    (isSwitchedToAnnual? subscriptionExtraCost.largeAnnual: subscriptionExtraCost.largeMonthly)
                    ); 
                uiStorage.checkoutPanelTotal.html(calculateTotalAmount); 
                uiStorage.checkoutPanelTotalAmountCharge.html(calculateTotalAmount);

                uiStorage.checkoutPanelBillingPeriod.html(isSwitchedToAnnual? "yr": "mth");
                setCheckoutButtonRedirect(); 
                break;

        }
    }

    var calculatedTotal = function(subscriptionBaseCost, extraPerUnitCost){
        var numberOfExtras = selectedNumberOfExtras
        var totalAmount = subscriptionBaseCost + numberOfExtras*extraPerUnitCost;
        return totalAmount;
    }

    var setCheckoutButtonRedirect = function(){
        if(isSwitchedToAnnual){
            switch (selectedPlan){
                case selectedPlanOptions.individual:


                    checkoutButton.on("click", function () {
                        stripe.redirectToCheckout({
                            lineItems: [{ price: stripeCheckoutPriceCode.individualBaseAnnual, quantity: 1 }],
                            mode: 'subscription',
                            successUrl: window.location.protocol + '//go.youli.io/ttc/renewal-success',
                            cancelUrl: window.location.protocol + '//go.youli.io/ttc/renewal-failed',
                            shippingAddressCollection: {
                                allowedCountries: ["AC", "AD", "AE", "AF", "AG", "AI", "AL", "AM", "AO", "AQ", "AR", "AT", "AU", "AW", "AX", "AZ", "BA", "BB", "BD", "BE", "BF", "BG", "BH", "BI", "BJ", "BL", "BM", "BN", "BO", "BQ", "BR", "BS", "BT", "BV", "BW", "BY", "BZ", "CA", "CD", "CF", "CG", "CH", "CI", "CK", "CL", "CM", "CN", "CO", "CR", "CV", "CW", "CY", "CZ", "DE", "DJ", "DK", "DM", "DO", "DZ", "EC", "EE", "EG", "EH", "ER", "ES", "ET", "FI", "FJ", "FK", "FO", "FR", "GA", "GB", "GD", "GE", "GF", "GG", "GH", "GI", "GL", "GM", "GN", "GP", "GQ", "GR", "GS", "GT", "GU", "GW", "GY", "HK", "HN", "HR", "HT", "HU", "ID", "IE", "IL", "IM", "IN", "IO", "IQ", "IS", "IT", "JE", "JM", "JO", "JP", "KE", "KG", "KH", "KI", "KM", "KN", "KR", "KW", "KY", "KZ", "LA", "LB", "LC", "LI", "LK", "LR", "LS", "LT", "LU", "LV", "LY", "MA", "MC", "MD", "ME", "MF", "MG", "MK", "ML", "MM", "MN", "MO", "MQ", "MR", "MS", "MT", "MU", "MV", "MW", "MX", "MY", "MZ", "NA", "NC", "NE", "NG", "NI", "NL", "NO", "NP", "NR", "NU", "NZ", "OM", "PA", "PE", "PF", "PG", "PH", "PK", "PL", "PM", "PN", "PR", "PS", "PT", "PY", "QA", "RE", "RO", "RS", "RU", "RW", "SA", "SB", "SC", "SE", "SG", "SH", "SI", "SJ", "SK", "SL", "SM", "SN", "SO", "SR", "SS", "ST", "SV", "SX", "SZ", "TA", "TC", "TD", "TF", "TG", "TH", "TJ", "TK", "TL", "TM", "TN", "TO", "TR", "TT", "TV", "TW", "TZ", "UA", "UG", "US", "UY", "UZ", "VA", "VC", "VE", "VG", "VN", "VU", "WF", "WS", "XK", "YE", "YT", "ZA", "ZM", "ZW", "ZZ"],
                            }
                        })
                            .then(function (result) {
                                if (result.error) {
                                    /*
                                     * If `redirectToCheckout` fails due to a browser or network
                                     * error, display the localized error message to your customer.
                                     */
                                    var displayError = document.getElementById('error-message');
                                    displayError.textContent = result.error.message;
                                }
                            });
                    });
                  
                    break;
    
                case selectedPlanOptions.small:
                    if(selectedNumberOfExtras != 0){
                        checkoutButton.on("click", function () {
                            console.log(selectedNumberOfExtras);
                            var extraQuantity = Number(selectedNumberOfExtras);

                            stripe.redirectToCheckout({
                                lineItems: [{ price: stripeCheckoutPriceCode.smallBaseAnnual, quantity: 1 },
                                {price: stripeCheckoutPriceCode.smallExtraAnnual, quantity: extraQuantity}],
                                mode: 'subscription',
                                successUrl: window.location.protocol + '//go.youli.io/ttc/renewal-success',
                                cancelUrl: window.location.protocol + '//go.youli.io/ttc/renewal-failed',
                                shippingAddressCollection: {
                                    allowedCountries: ["AC", "AD", "AE", "AF", "AG", "AI", "AL", "AM", "AO", "AQ", "AR", "AT", "AU", "AW", "AX", "AZ", "BA", "BB", "BD", "BE", "BF", "BG", "BH", "BI", "BJ", "BL", "BM", "BN", "BO", "BQ", "BR", "BS", "BT", "BV", "BW", "BY", "BZ", "CA", "CD", "CF", "CG", "CH", "CI", "CK", "CL", "CM", "CN", "CO", "CR", "CV", "CW", "CY", "CZ", "DE", "DJ", "DK", "DM", "DO", "DZ", "EC", "EE", "EG", "EH", "ER", "ES", "ET", "FI", "FJ", "FK", "FO", "FR", "GA", "GB", "GD", "GE", "GF", "GG", "GH", "GI", "GL", "GM", "GN", "GP", "GQ", "GR", "GS", "GT", "GU", "GW", "GY", "HK", "HN", "HR", "HT", "HU", "ID", "IE", "IL", "IM", "IN", "IO", "IQ", "IS", "IT", "JE", "JM", "JO", "JP", "KE", "KG", "KH", "KI", "KM", "KN", "KR", "KW", "KY", "KZ", "LA", "LB", "LC", "LI", "LK", "LR", "LS", "LT", "LU", "LV", "LY", "MA", "MC", "MD", "ME", "MF", "MG", "MK", "ML", "MM", "MN", "MO", "MQ", "MR", "MS", "MT", "MU", "MV", "MW", "MX", "MY", "MZ", "NA", "NC", "NE", "NG", "NI", "NL", "NO", "NP", "NR", "NU", "NZ", "OM", "PA", "PE", "PF", "PG", "PH", "PK", "PL", "PM", "PN", "PR", "PS", "PT", "PY", "QA", "RE", "RO", "RS", "RU", "RW", "SA", "SB", "SC", "SE", "SG", "SH", "SI", "SJ", "SK", "SL", "SM", "SN", "SO", "SR", "SS", "ST", "SV", "SX", "SZ", "TA", "TC", "TD", "TF", "TG", "TH", "TJ", "TK", "TL", "TM", "TN", "TO", "TR", "TT", "TV", "TW", "TZ", "UA", "UG", "US", "UY", "UZ", "VA", "VC", "VE", "VG", "VN", "VU", "WF", "WS", "XK", "YE", "YT", "ZA", "ZM", "ZW", "ZZ"],
                                }
                            })
                                .then(function (result) {
                                    if (result.error) {
                                        /*
                                         * If `redirectToCheckout` fails due to a browser or network
                                         * error, display the localized error message to your customer.
                                         */
                                        var displayError = document.getElementById('error-message');
                                        displayError.textContent = result.error.message;
                                    }
                                });
                        });
                    }else{
                        checkoutButton.on("click", function () {
                            console.log(selectedNumberOfExtras);

                            stripe.redirectToCheckout({
                                lineItems: [{ price: stripeCheckoutPriceCode.smallBaseAnnual, quantity: 1 }],
                                mode: 'subscription',
                                successUrl: window.location.protocol + '//go.youli.io/ttc/renewal-success',
                                cancelUrl: window.location.protocol + '//go.youli.io/ttc/renewal-failed',
                                shippingAddressCollection: {
                                    allowedCountries: ["AC", "AD", "AE", "AF", "AG", "AI", "AL", "AM", "AO", "AQ", "AR", "AT", "AU", "AW", "AX", "AZ", "BA", "BB", "BD", "BE", "BF", "BG", "BH", "BI", "BJ", "BL", "BM", "BN", "BO", "BQ", "BR", "BS", "BT", "BV", "BW", "BY", "BZ", "CA", "CD", "CF", "CG", "CH", "CI", "CK", "CL", "CM", "CN", "CO", "CR", "CV", "CW", "CY", "CZ", "DE", "DJ", "DK", "DM", "DO", "DZ", "EC", "EE", "EG", "EH", "ER", "ES", "ET", "FI", "FJ", "FK", "FO", "FR", "GA", "GB", "GD", "GE", "GF", "GG", "GH", "GI", "GL", "GM", "GN", "GP", "GQ", "GR", "GS", "GT", "GU", "GW", "GY", "HK", "HN", "HR", "HT", "HU", "ID", "IE", "IL", "IM", "IN", "IO", "IQ", "IS", "IT", "JE", "JM", "JO", "JP", "KE", "KG", "KH", "KI", "KM", "KN", "KR", "KW", "KY", "KZ", "LA", "LB", "LC", "LI", "LK", "LR", "LS", "LT", "LU", "LV", "LY", "MA", "MC", "MD", "ME", "MF", "MG", "MK", "ML", "MM", "MN", "MO", "MQ", "MR", "MS", "MT", "MU", "MV", "MW", "MX", "MY", "MZ", "NA", "NC", "NE", "NG", "NI", "NL", "NO", "NP", "NR", "NU", "NZ", "OM", "PA", "PE", "PF", "PG", "PH", "PK", "PL", "PM", "PN", "PR", "PS", "PT", "PY", "QA", "RE", "RO", "RS", "RU", "RW", "SA", "SB", "SC", "SE", "SG", "SH", "SI", "SJ", "SK", "SL", "SM", "SN", "SO", "SR", "SS", "ST", "SV", "SX", "SZ", "TA", "TC", "TD", "TF", "TG", "TH", "TJ", "TK", "TL", "TM", "TN", "TO", "TR", "TT", "TV", "TW", "TZ", "UA", "UG", "US", "UY", "UZ", "VA", "VC", "VE", "VG", "VN", "VU", "WF", "WS", "XK", "YE", "YT", "ZA", "ZM", "ZW", "ZZ"],
                                }
                            })
                                .then(function (result) {
                                    if (result.error) {
                                        /*
                                         * If `redirectToCheckout` fails due to a browser or network
                                         * error, display the localized error message to your customer.
                                         */
                                        var displayError = document.getElementById('error-message');
                                        displayError.textContent = result.error.message;
                                    }
                                });
                        });
                    }
                   
                    break;
    
                case selectedPlanOptions.medium:
                    if(selectedNumberOfExtras != 0){
                        checkoutButton.on("click", function () {
                            console.log(selectedNumberOfExtras);
                            var extraQuantity = Number(selectedNumberOfExtras);

                            stripe.redirectToCheckout({
                                lineItems: [{ price: stripeCheckoutPriceCode.mediumBaseAnnual, quantity: 1 },
                                {price: stripeCheckoutPriceCode.mediumExtraAnnual, quantity: extraQuantity}],
                                mode: 'subscription',
                                successUrl: window.location.protocol + '//go.youli.io/ttc/renewal-success',
                                cancelUrl: window.location.protocol + '//go.youli.io/ttc/renewal-failed',
                                shippingAddressCollection: {
                                    allowedCountries: ["AC", "AD", "AE", "AF", "AG", "AI", "AL", "AM", "AO", "AQ", "AR", "AT", "AU", "AW", "AX", "AZ", "BA", "BB", "BD", "BE", "BF", "BG", "BH", "BI", "BJ", "BL", "BM", "BN", "BO", "BQ", "BR", "BS", "BT", "BV", "BW", "BY", "BZ", "CA", "CD", "CF", "CG", "CH", "CI", "CK", "CL", "CM", "CN", "CO", "CR", "CV", "CW", "CY", "CZ", "DE", "DJ", "DK", "DM", "DO", "DZ", "EC", "EE", "EG", "EH", "ER", "ES", "ET", "FI", "FJ", "FK", "FO", "FR", "GA", "GB", "GD", "GE", "GF", "GG", "GH", "GI", "GL", "GM", "GN", "GP", "GQ", "GR", "GS", "GT", "GU", "GW", "GY", "HK", "HN", "HR", "HT", "HU", "ID", "IE", "IL", "IM", "IN", "IO", "IQ", "IS", "IT", "JE", "JM", "JO", "JP", "KE", "KG", "KH", "KI", "KM", "KN", "KR", "KW", "KY", "KZ", "LA", "LB", "LC", "LI", "LK", "LR", "LS", "LT", "LU", "LV", "LY", "MA", "MC", "MD", "ME", "MF", "MG", "MK", "ML", "MM", "MN", "MO", "MQ", "MR", "MS", "MT", "MU", "MV", "MW", "MX", "MY", "MZ", "NA", "NC", "NE", "NG", "NI", "NL", "NO", "NP", "NR", "NU", "NZ", "OM", "PA", "PE", "PF", "PG", "PH", "PK", "PL", "PM", "PN", "PR", "PS", "PT", "PY", "QA", "RE", "RO", "RS", "RU", "RW", "SA", "SB", "SC", "SE", "SG", "SH", "SI", "SJ", "SK", "SL", "SM", "SN", "SO", "SR", "SS", "ST", "SV", "SX", "SZ", "TA", "TC", "TD", "TF", "TG", "TH", "TJ", "TK", "TL", "TM", "TN", "TO", "TR", "TT", "TV", "TW", "TZ", "UA", "UG", "US", "UY", "UZ", "VA", "VC", "VE", "VG", "VN", "VU", "WF", "WS", "XK", "YE", "YT", "ZA", "ZM", "ZW", "ZZ"],
                                }
                            })
                                .then(function (result) {
                                    if (result.error) {
                                        /*
                                         * If `redirectToCheckout` fails due to a browser or network
                                         * error, display the localized error message to your customer.
                                         */
                                        var displayError = document.getElementById('error-message');
                                        displayError.textContent = result.error.message;
                                    }
                                });
                        });
                    }else{
                        checkoutButton.on("click", function () {
                            // console.log(selectedNumberOfExtras);

                            stripe.redirectToCheckout({
                                lineItems: [{ price: stripeCheckoutPriceCode.mediumBaseAnnual, quantity: 1 }],
                                mode: 'subscription',
                                successUrl: window.location.protocol + '//go.youli.io/ttc/renewal-success',
                                cancelUrl: window.location.protocol + '//go.youli.io/ttc/renewal-failed',
                                shippingAddressCollection: {
                                    allowedCountries: ["AC", "AD", "AE", "AF", "AG", "AI", "AL", "AM", "AO", "AQ", "AR", "AT", "AU", "AW", "AX", "AZ", "BA", "BB", "BD", "BE", "BF", "BG", "BH", "BI", "BJ", "BL", "BM", "BN", "BO", "BQ", "BR", "BS", "BT", "BV", "BW", "BY", "BZ", "CA", "CD", "CF", "CG", "CH", "CI", "CK", "CL", "CM", "CN", "CO", "CR", "CV", "CW", "CY", "CZ", "DE", "DJ", "DK", "DM", "DO", "DZ", "EC", "EE", "EG", "EH", "ER", "ES", "ET", "FI", "FJ", "FK", "FO", "FR", "GA", "GB", "GD", "GE", "GF", "GG", "GH", "GI", "GL", "GM", "GN", "GP", "GQ", "GR", "GS", "GT", "GU", "GW", "GY", "HK", "HN", "HR", "HT", "HU", "ID", "IE", "IL", "IM", "IN", "IO", "IQ", "IS", "IT", "JE", "JM", "JO", "JP", "KE", "KG", "KH", "KI", "KM", "KN", "KR", "KW", "KY", "KZ", "LA", "LB", "LC", "LI", "LK", "LR", "LS", "LT", "LU", "LV", "LY", "MA", "MC", "MD", "ME", "MF", "MG", "MK", "ML", "MM", "MN", "MO", "MQ", "MR", "MS", "MT", "MU", "MV", "MW", "MX", "MY", "MZ", "NA", "NC", "NE", "NG", "NI", "NL", "NO", "NP", "NR", "NU", "NZ", "OM", "PA", "PE", "PF", "PG", "PH", "PK", "PL", "PM", "PN", "PR", "PS", "PT", "PY", "QA", "RE", "RO", "RS", "RU", "RW", "SA", "SB", "SC", "SE", "SG", "SH", "SI", "SJ", "SK", "SL", "SM", "SN", "SO", "SR", "SS", "ST", "SV", "SX", "SZ", "TA", "TC", "TD", "TF", "TG", "TH", "TJ", "TK", "TL", "TM", "TN", "TO", "TR", "TT", "TV", "TW", "TZ", "UA", "UG", "US", "UY", "UZ", "VA", "VC", "VE", "VG", "VN", "VU", "WF", "WS", "XK", "YE", "YT", "ZA", "ZM", "ZW", "ZZ"],
                                }
                            })
                                .then(function (result) {
                                    if (result.error) {
                                        /*
                                         * If `redirectToCheckout` fails due to a browser or network
                                         * error, display the localized error message to your customer.
                                         */
                                        var displayError = document.getElementById('error-message');
                                        displayError.textContent = result.error.message;
                                    }
                                });
                        });
                    }
                    
                    break;
    
                case selectedPlanOptions.large:
                    if(selectedNumberOfExtras != 0){
                        checkoutButton.on("click", function () {
                            console.log(selectedNumberOfExtras);

                            var extraQuantity = Number(selectedNumberOfExtras);

                            stripe.redirectToCheckout({
                                lineItems: [{ price: stripeCheckoutPriceCode.largeBaseAnnual, quantity: 1 },
                                {price: stripeCheckoutPriceCode.largeExtraAnnual, quantity: extraQuantity}],
                                mode: 'subscription',
                                successUrl: window.location.protocol + '//go.youli.io/ttc/renewal-success',
                                cancelUrl: window.location.protocol + '//go.youli.io/ttc/renewal-failed',
                                shippingAddressCollection: {
                                    allowedCountries: ["AC", "AD", "AE", "AF", "AG", "AI", "AL", "AM", "AO", "AQ", "AR", "AT", "AU", "AW", "AX", "AZ", "BA", "BB", "BD", "BE", "BF", "BG", "BH", "BI", "BJ", "BL", "BM", "BN", "BO", "BQ", "BR", "BS", "BT", "BV", "BW", "BY", "BZ", "CA", "CD", "CF", "CG", "CH", "CI", "CK", "CL", "CM", "CN", "CO", "CR", "CV", "CW", "CY", "CZ", "DE", "DJ", "DK", "DM", "DO", "DZ", "EC", "EE", "EG", "EH", "ER", "ES", "ET", "FI", "FJ", "FK", "FO", "FR", "GA", "GB", "GD", "GE", "GF", "GG", "GH", "GI", "GL", "GM", "GN", "GP", "GQ", "GR", "GS", "GT", "GU", "GW", "GY", "HK", "HN", "HR", "HT", "HU", "ID", "IE", "IL", "IM", "IN", "IO", "IQ", "IS", "IT", "JE", "JM", "JO", "JP", "KE", "KG", "KH", "KI", "KM", "KN", "KR", "KW", "KY", "KZ", "LA", "LB", "LC", "LI", "LK", "LR", "LS", "LT", "LU", "LV", "LY", "MA", "MC", "MD", "ME", "MF", "MG", "MK", "ML", "MM", "MN", "MO", "MQ", "MR", "MS", "MT", "MU", "MV", "MW", "MX", "MY", "MZ", "NA", "NC", "NE", "NG", "NI", "NL", "NO", "NP", "NR", "NU", "NZ", "OM", "PA", "PE", "PF", "PG", "PH", "PK", "PL", "PM", "PN", "PR", "PS", "PT", "PY", "QA", "RE", "RO", "RS", "RU", "RW", "SA", "SB", "SC", "SE", "SG", "SH", "SI", "SJ", "SK", "SL", "SM", "SN", "SO", "SR", "SS", "ST", "SV", "SX", "SZ", "TA", "TC", "TD", "TF", "TG", "TH", "TJ", "TK", "TL", "TM", "TN", "TO", "TR", "TT", "TV", "TW", "TZ", "UA", "UG", "US", "UY", "UZ", "VA", "VC", "VE", "VG", "VN", "VU", "WF", "WS", "XK", "YE", "YT", "ZA", "ZM", "ZW", "ZZ"],
                                }
                            })
                                .then(function (result) {
                                    if (result.error) {
                                        /*
                                         * If `redirectToCheckout` fails due to a browser or network
                                         * error, display the localized error message to your customer.
                                         */
                                        var displayError = document.getElementById('error-message');
                                        displayError.textContent = result.error.message;
                                    }
                                });
                        });
                    }else{
                        checkoutButton.on("click", function () {
                            console.log(selectedNumberOfExtras);

                            stripe.redirectToCheckout({
                                lineItems: [{ price: stripeCheckoutPriceCode.largeBaseAnnual, quantity: 1 }],
                                mode: 'subscription',
                                successUrl: window.location.protocol + '//go.youli.io/ttc/renewal-success',
                                cancelUrl: window.location.protocol + '//go.youli.io/ttc/renewal-failed',
                                shippingAddressCollection: {
                                    allowedCountries: ["AC", "AD", "AE", "AF", "AG", "AI", "AL", "AM", "AO", "AQ", "AR", "AT", "AU", "AW", "AX", "AZ", "BA", "BB", "BD", "BE", "BF", "BG", "BH", "BI", "BJ", "BL", "BM", "BN", "BO", "BQ", "BR", "BS", "BT", "BV", "BW", "BY", "BZ", "CA", "CD", "CF", "CG", "CH", "CI", "CK", "CL", "CM", "CN", "CO", "CR", "CV", "CW", "CY", "CZ", "DE", "DJ", "DK", "DM", "DO", "DZ", "EC", "EE", "EG", "EH", "ER", "ES", "ET", "FI", "FJ", "FK", "FO", "FR", "GA", "GB", "GD", "GE", "GF", "GG", "GH", "GI", "GL", "GM", "GN", "GP", "GQ", "GR", "GS", "GT", "GU", "GW", "GY", "HK", "HN", "HR", "HT", "HU", "ID", "IE", "IL", "IM", "IN", "IO", "IQ", "IS", "IT", "JE", "JM", "JO", "JP", "KE", "KG", "KH", "KI", "KM", "KN", "KR", "KW", "KY", "KZ", "LA", "LB", "LC", "LI", "LK", "LR", "LS", "LT", "LU", "LV", "LY", "MA", "MC", "MD", "ME", "MF", "MG", "MK", "ML", "MM", "MN", "MO", "MQ", "MR", "MS", "MT", "MU", "MV", "MW", "MX", "MY", "MZ", "NA", "NC", "NE", "NG", "NI", "NL", "NO", "NP", "NR", "NU", "NZ", "OM", "PA", "PE", "PF", "PG", "PH", "PK", "PL", "PM", "PN", "PR", "PS", "PT", "PY", "QA", "RE", "RO", "RS", "RU", "RW", "SA", "SB", "SC", "SE", "SG", "SH", "SI", "SJ", "SK", "SL", "SM", "SN", "SO", "SR", "SS", "ST", "SV", "SX", "SZ", "TA", "TC", "TD", "TF", "TG", "TH", "TJ", "TK", "TL", "TM", "TN", "TO", "TR", "TT", "TV", "TW", "TZ", "UA", "UG", "US", "UY", "UZ", "VA", "VC", "VE", "VG", "VN", "VU", "WF", "WS", "XK", "YE", "YT", "ZA", "ZM", "ZW", "ZZ"],
                                }
                            })
                                .then(function (result) {
                                    if (result.error) {
                                        /*
                                         * If `redirectToCheckout` fails due to a browser or network
                                         * error, display the localized error message to your customer.
                                         */
                                        var displayError = document.getElementById('error-message');
                                        displayError.textContent = result.error.message;
                                    }
                                });
                        });
                    }
                   
                    break;
    
            }
        }else{
            switch (selectedPlan){
                case selectedPlanOptions.individual:
                    checkoutButton.on("click", function () {
                        stripe.redirectToCheckout({
                            lineItems: [{ price: stripeCheckoutPriceCode.individualBaseMonthly, quantity: 1 }],
                            mode: 'subscription',
                            successUrl: window.location.protocol + '//go.youli.io/ttc/renewal-success',
                            cancelUrl: window.location.protocol + '//go.youli.io/ttc/renewal-failed'
                        })
                            .then(function (result) {
                                if (result.error) {
                                    /*
                                     * If `redirectToCheckout` fails due to a browser or network
                                     * error, display the localized error message to your customer.
                                     */
                                    var displayError = document.getElementById('error-message');
                                    displayError.textContent = result.error.message;
                                }
                            });
                    });
                    
                    break;
    
                case selectedPlanOptions.small:
                    if(selectedNumberOfExtras != 0){
                        checkoutButton.on("click", function () {
                            console.log(selectedNumberOfExtras);
                            var extraQuantity = Number(selectedNumberOfExtras);
                            
                            stripe.redirectToCheckout({
                                lineItems: [{ price: stripeCheckoutPriceCode.smallBaseMonthly, quantity: 1 },
                                {price: stripeCheckoutPriceCode.smallExtraMonthly, quantity: extraQuantity}],
                                mode: 'subscription',
                                successUrl: window.location.protocol + '//go.youli.io/ttc/renewal-success',
                                cancelUrl: window.location.protocol + '//go.youli.io/ttc/renewal-failed'
                            })
                                .then(function (result) {
                                    if (result.error) {
                                        /*
                                         * If `redirectToCheckout` fails due to a browser or network
                                         * error, display the localized error message to your customer.
                                         */
                                        var displayError = document.getElementById('error-message');
                                        displayError.textContent = result.error.message;
                                    }
                                });
                        });
                    }else{
                        checkoutButton.on("click", function () {
                            console.log(selectedNumberOfExtras);

                            stripe.redirectToCheckout({
                                lineItems: [{ price: stripeCheckoutPriceCode.smallBaseMonthly, quantity: 1 }],
                                mode: 'subscription',
                                successUrl: window.location.protocol + '//go.youli.io/ttc/renewal-success',
                                cancelUrl: window.location.protocol + '//go.youli.io/ttc/renewal-failed'
                            })
                                .then(function (result) {
                                    if (result.error) {
                                        /*
                                         * If `redirectToCheckout` fails due to a browser or network
                                         * error, display the localized error message to your customer.
                                         */
                                        var displayError = document.getElementById('error-message');
                                        displayError.textContent = result.error.message;
                                    }
                                });
                        });
                    }
                   
                    break;
    
                case selectedPlanOptions.medium:
                    if(selectedNumberOfExtras != 0){
                        checkoutButton.on("click", function () {
                            console.log(selectedNumberOfExtras);
                            var extraQuantity = Number(selectedNumberOfExtras);

                            stripe.redirectToCheckout({
                                lineItems: [{ price: stripeCheckoutPriceCode.mediumBaseMonthly, quantity: 1 },
                                {price: stripeCheckoutPriceCode.mediumExtraMonthly, quantity: extraQuantity}],
                                mode: 'subscription',
                                successUrl: window.location.protocol + '//go.youli.io/ttc/renewal-success',
                                cancelUrl: window.location.protocol + '//go.youli.io/ttc/renewal-failed'
                            })
                                .then(function (result) {
                                    if (result.error) {
                                        /*
                                         * If `redirectToCheckout` fails due to a browser or network
                                         * error, display the localized error message to your customer.
                                         */
                                        var displayError = document.getElementById('error-message');
                                        displayError.textContent = result.error.message;
                                    }
                                });
                        });
                    }else{
                        checkoutButton.on("click", function () {
                            console.log(selectedNumberOfExtras);

                            stripe.redirectToCheckout({
                                lineItems: [{ price: stripeCheckoutPriceCode.mediumBaseMonthly, quantity: 1 }],
                                mode: 'subscription',
                                successUrl: window.location.protocol + '//go.youli.io/ttc/renewal-success',
                                cancelUrl: window.location.protocol + '//go.youli.io/ttc/renewal-failed'
                            })
                                .then(function (result) {
                                    if (result.error) {
                                        /*
                                         * If `redirectToCheckout` fails due to a browser or network
                                         * error, display the localized error message to your customer.
                                         */
                                        var displayError = document.getElementById('error-message');
                                        displayError.textContent = result.error.message;
                                    }
                                });
                        });
                    }
                    
                    break;
    
                case selectedPlanOptions.large:
                    if(selectedNumberOfExtras != 0){
                        checkoutButton.on("click", function () {
                            console.log(selectedNumberOfExtras);
                            var extraQuantity = Number(selectedNumberOfExtras);

                            stripe.redirectToCheckout({
                                lineItems: [{ price: stripeCheckoutPriceCode.largeBaseMonthly, quantity: 1 },
                                {price: stripeCheckoutPriceCode.largeExtraMonthly, quantity: extraQuantity}],
                                mode: 'subscription',
                                successUrl: window.location.protocol + '//go.youli.io/ttc/renewal-success',
                                cancelUrl: window.location.protocol + '//go.youli.io/ttc/renewal-failed'
                            })
                                .then(function (result) {
                                    if (result.error) {
                                        /*
                                         * If `redirectToCheckout` fails due to a browser or network
                                         * error, display the localized error message to your customer.
                                         */
                                        var displayError = document.getElementById('error-message');
                                        displayError.textContent = result.error.message;
                                    }
                                });
                        });
                    }else{
                        checkoutButton.on("click", function () {
                            console.log(selectedNumberOfExtras);

                            stripe.redirectToCheckout({
                                lineItems: [{ price: stripeCheckoutPriceCode.largeBaseMonthly, quantity: 1 }],
                                mode: 'subscription',
                                successUrl: window.location.protocol + '//go.youli.io/ttc/renewal-success',
                                cancelUrl: window.location.protocol + '//go.youli.io/ttc/renewal-failed'
                            })
                                .then(function (result) {
                                    if (result.error) {
                                        /*
                                         * If `redirectToCheckout` fails due to a browser or network
                                         * error, display the localized error message to your customer.
                                         */
                                        var displayError = document.getElementById('error-message');
                                        displayError.textContent = result.error.message;
                                    }
                                });
                        });
                    }
                   
                    break;
    
            }

        }
    }


    

    
    


    // checkoutButton.addEventListener('click', function () {
    //     stripe.redirectToCheckout({
    //         lineItems: [{ price: stripeCheckoutPriceCode.individualBaseAnnual, quantity: 1 }],
    //         mode: 'subscription',
    //         successUrl: window.location.protocol + '//xiaotian35.com/subscription/success',
    //         cancelUrl: window.location.protocol + '//youli-2021-relaunch.webflow.io/pricing-subscription',
    //         shippingAddressCollection: {
    //             allowedCountries: ["AC", "AD", "AE", "AF", "AG", "AI", "AL", "AM", "AO", "AQ", "AR", "AT", "AU", "AW", "AX", "AZ", "BA", "BB", "BD", "BE", "BF", "BG", "BH", "BI", "BJ", "BL", "BM", "BN", "BO", "BQ", "BR", "BS", "BT", "BV", "BW", "BY", "BZ", "CA", "CD", "CF", "CG", "CH", "CI", "CK", "CL", "CM", "CN", "CO", "CR", "CV", "CW", "CY", "CZ", "DE", "DJ", "DK", "DM", "DO", "DZ", "EC", "EE", "EG", "EH", "ER", "ES", "ET", "FI", "FJ", "FK", "FO", "FR", "GA", "GB", "GD", "GE", "GF", "GG", "GH", "GI", "GL", "GM", "GN", "GP", "GQ", "GR", "GS", "GT", "GU", "GW", "GY", "HK", "HN", "HR", "HT", "HU", "ID", "IE", "IL", "IM", "IN", "IO", "IQ", "IS", "IT", "JE", "JM", "JO", "JP", "KE", "KG", "KH", "KI", "KM", "KN", "KR", "KW", "KY", "KZ", "LA", "LB", "LC", "LI", "LK", "LR", "LS", "LT", "LU", "LV", "LY", "MA", "MC", "MD", "ME", "MF", "MG", "MK", "ML", "MM", "MN", "MO", "MQ", "MR", "MS", "MT", "MU", "MV", "MW", "MX", "MY", "MZ", "NA", "NC", "NE", "NG", "NI", "NL", "NO", "NP", "NR", "NU", "NZ", "OM", "PA", "PE", "PF", "PG", "PH", "PK", "PL", "PM", "PN", "PR", "PS", "PT", "PY", "QA", "RE", "RO", "RS", "RU", "RW", "SA", "SB", "SC", "SE", "SG", "SH", "SI", "SJ", "SK", "SL", "SM", "SN", "SO", "SR", "SS", "ST", "SV", "SX", "SZ", "TA", "TC", "TD", "TF", "TG", "TH", "TJ", "TK", "TL", "TM", "TN", "TO", "TR", "TT", "TV", "TW", "TZ", "UA", "UG", "US", "UY", "UZ", "VA", "VC", "VE", "VG", "VN", "VU", "WF", "WS", "XK", "YE", "YT", "ZA", "ZM", "ZW", "ZZ"],
    //         }
    //     })
    //         .then(function (result) {
    //             if (result.error) {
    //                 /*
    //                  * If `redirectToCheckout` fails due to a browser or network
    //                  * error, display the localized error message to your customer.
    //                  */
    //                 var displayError = document.getElementById('error-message');
    //                 displayError.textContent = result.error.message;
    //             }
    //         });
    // });
})
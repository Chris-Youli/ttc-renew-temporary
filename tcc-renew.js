$(function () {

    var stripe = Stripe('pk_test_51H7AHJAbOHXxPX3zcepgLQRJoWGR95z9TvRx5Rv8sazgZJcDr2X8HAPQhDtziCrnIidRnYPFYMDsutkREvqkM1vE00TC2eeym1');
    var checkoutButton = document.getElementById('checkout-button');


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

        packageCardPriceIndividual:$("#ttc-renew-card-price-individual"),
        packageCardPriceSmall:$("#ttc-renew-card-price-small"),
        packageCardPriceMedium:$("#ttc-renew-card-price-medium"),
        packageCardPriceLarge:$("#ttc-renew-card-price-large"),

        packageCardPerExtraSmall:$("#ttc-renew-card-per-extra-small"),
        packageCardPerExtraMedium:$("#ttc-renew-card-per-extra-medium"),
        packageCardPerExtraLarge:$("#ttc-renew-card-per-extra-large"),
        
        packageCardExtraSelector: $(".ttc-renew-number-login-selector"),

        
        

                
        
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
        individualMonthly: 16.5,
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
        withJournal: "Free W/ Annual Subscription",
        withoutJournal: "Not Included"
    }

    var stripeCheckoutPriceCode = {
        individualBaseMonthly: "price_1KbFyLAbOHXxPX3ztkfYL7MY",
        smallBaseMonthly: "price_1KbG6YAbOHXxPX3ze5I4MLgI",
        mediumBaseMonthly:"price_1KbKAOAbOHXxPX3zp7WRuppx",
        largeBaseMonthly:"price_1KbKCwAbOHXxPX3zTOj2LX1L",

        individualBaseAnnual: "price_1KbFyLAbOHXxPX3zl3DiKJ50",
        smallBaseAnnual: "price_1KbGEQAbOHXxPX3zjmGvwlEq",
        mediumBaseAnnual: "price_1KbKBdAbOHXxPX3zOyXt5orm",
        largeBaseAnnual: "price_1KbKDlAbOHXxPX3zk4PAlLbT",

        smallExtraMonthly: "price_1KbG9GAbOHXxPX3z2VsxWFUl",
        mediumExtraMonthly:"price_1KbKAnAbOHXxPX3znL4AKGXU",
        largeExtraMonthly:"price_1KbKDHAbOHXxPX3zYK2iJYRT",

        smallExtraAnnual: "price_1KbK8wAbOHXxPX3z0EwYmMb9",
        mediumExtraAnnual:"price_1KbKC1AbOHXxPX3zb1JEiQxV",
        largeExtraAnnual:"price_1KbKE8AbOHXxPX3zS4NJK3UB"
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

        }else{
            frequencyToggle.prop('checked', false);
            frequencyToggleDot.css({ float: "left" });
            isSwitchedToAnnual = true;

            uiStorage.packageCardPriceIndividual.html(subscriptionBaseCost.individualAnnual);
            uiStorage.packageCardPriceSmall.html(subscriptionBaseCost.smallAnnual);
            uiStorage.packageCardPriceMedium.html(subscriptionBaseCost.mediumAnnual);
            uiStorage.packageCardPriceLarge.html(subscriptionBaseCost.largeAnnual);

            uiStorage.packageCardPerExtraSmall.html(subscriptionExtraCost.smallAnnual);
            uiStorage.packageCardPerExtraMedium.html(subscriptionExtraCost.mediumAnnual);
            uiStorage.packageCardPerExtraLarge.html(subscriptionExtraCost.largeAnnual);
        }
        updateCheckoutPanel();
    })


    uiStorage.packageCardExtraSelector.each(function (){
        $(this).change(function(){
            var numberSelected = $(this).val();
            if(numberSelected >= 0){
                selectedNumberOfExtras = numberSelected;
                
            }else{
                selectedNumberOfExtras = 0
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
                    checkoutButton.addEventListener('click', function () {
                        stripe.redirectToCheckout({
                            lineItems: [{ price: stripeCheckoutPriceCode.individualBaseAnnual, quantity: 1 }],
                            mode: 'subscription',
                            successUrl: window.location.protocol + '//xiaotian35.com/subscription/success',
                            cancelUrl: window.location.protocol + '//youli-2021-relaunch.webflow.io/pricing-subscription',
                            shippingAddressCollection: {
                                allowedCountries: ['US', 'CA', 'AU', 'CN'],
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
                        checkoutButton.addEventListener('click', function () {
                            console.log(selectedNumberOfExtras);
                            stripe.redirectToCheckout({
                                lineItems: [{ price: stripeCheckoutPriceCode.smallBaseAnnual, quantity: 1 },
                                {price: stripeCheckoutPriceCode.smallExtraAnnual, quantity: parseInt(selectedNumberOfExtras)}],
                                mode: 'subscription',
                                successUrl: window.location.protocol + '//xiaotian35.com/subscription/success',
                                cancelUrl: window.location.protocol + '//youli-2021-relaunch.webflow.io/pricing-subscription',
                                shippingAddressCollection: {
                                    allowedCountries: ['US', 'CA', 'AU', 'CN'],
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
                        checkoutButton.addEventListener('click', function () {
                            console.log(selectedNumberOfExtras);

                            stripe.redirectToCheckout({
                                lineItems: [{ price: stripeCheckoutPriceCode.smallBaseAnnual, quantity: 1 }],
                                mode: 'subscription',
                                successUrl: window.location.protocol + '//xiaotian35.com/subscription/success',
                                cancelUrl: window.location.protocol + '//youli-2021-relaunch.webflow.io/pricing-subscription',
                                shippingAddressCollection: {
                                    allowedCountries: ['US', 'CA', 'AU', 'CN'],
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
                        checkoutButton.addEventListener('click', function () {
                            console.log(selectedNumberOfExtras);

                            stripe.redirectToCheckout({
                                lineItems: [{ price: stripeCheckoutPriceCode.mediumBaseAnnual, quantity: 1 },
                                {price: stripeCheckoutPriceCode.mediumExtraAnnual, quantity: parseInt(selectedNumberOfExtras)}],
                                mode: 'subscription',
                                successUrl: window.location.protocol + '//xiaotian35.com/subscription/success',
                                cancelUrl: window.location.protocol + '//youli-2021-relaunch.webflow.io/pricing-subscription',
                                shippingAddressCollection: {
                                    allowedCountries: ['US', 'CA', 'AU', 'CN'],
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
                        checkoutButton.addEventListener('click', function () {
                            console.log(selectedNumberOfExtras);

                            stripe.redirectToCheckout({
                                lineItems: [{ price: stripeCheckoutPriceCode.mediumBaseAnnual, quantity: 1 }],
                                mode: 'subscription',
                                successUrl: window.location.protocol + '//xiaotian35.com/subscription/success',
                                cancelUrl: window.location.protocol + '//youli-2021-relaunch.webflow.io/pricing-subscription',
                                shippingAddressCollection: {
                                    allowedCountries: ['US', 'CA', 'AU', 'CN'],
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
                        checkoutButton.addEventListener('click', function () {
                            console.log(selectedNumberOfExtras);

                            stripe.redirectToCheckout({
                                lineItems: [{ price: stripeCheckoutPriceCode.largeBaseAnnual, quantity: 1 },
                                {price: stripeCheckoutPriceCode.largeExtraAnnual, quantity: parseInt(selectedNumberOfExtras)}],
                                mode: 'subscription',
                                successUrl: window.location.protocol + '//xiaotian35.com/subscription/success',
                                cancelUrl: window.location.protocol + '//youli-2021-relaunch.webflow.io/pricing-subscription',
                                shippingAddressCollection: {
                                    allowedCountries: ['US', 'CA', 'AU', 'CN'],
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
                        checkoutButton.addEventListener('click', function () {
                            console.log(selectedNumberOfExtras);

                            stripe.redirectToCheckout({
                                lineItems: [{ price: stripeCheckoutPriceCode.largeBaseAnnual, quantity: 1 }],
                                mode: 'subscription',
                                successUrl: window.location.protocol + '//xiaotian35.com/subscription/success',
                                cancelUrl: window.location.protocol + '//youli-2021-relaunch.webflow.io/pricing-subscription',
                                shippingAddressCollection: {
                                    allowedCountries: ['US', 'CA', 'AU', 'CN'],
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
                    checkoutButton.addEventListener('click', function () {
                        stripe.redirectToCheckout({
                            lineItems: [{ price: stripeCheckoutPriceCode.individualBaseMonthly, quantity: 1 }],
                            mode: 'subscription',
                            successUrl: window.location.protocol + '//xiaotian35.com/subscription/success',
                            cancelUrl: window.location.protocol + '//youli-2021-relaunch.webflow.io/pricing-subscription'
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
                        checkoutButton.addEventListener('click', function () {
                            console.log(selectedNumberOfExtras);
                            stripe.redirectToCheckout({
                                lineItems: [{ price: stripeCheckoutPriceCode.smallBaseMonthly, quantity: 1 },
                                {price: stripeCheckoutPriceCode.smallExtraMonthly, quantity: parseInt(selectedNumberOfExtras)}],
                                mode: 'subscription',
                                successUrl: window.location.protocol + '//xiaotian35.com/subscription/success',
                                cancelUrl: window.location.protocol + '//youli-2021-relaunch.webflow.io/pricing-subscription'
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
                        checkoutButton.addEventListener('click', function () {
                            console.log(selectedNumberOfExtras);

                            stripe.redirectToCheckout({
                                lineItems: [{ price: stripeCheckoutPriceCode.smallBaseMonthly, quantity: 1 }],
                                mode: 'subscription',
                                successUrl: window.location.protocol + '//xiaotian35.com/subscription/success',
                                cancelUrl: window.location.protocol + '//youli-2021-relaunch.webflow.io/pricing-subscription'
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
                        checkoutButton.addEventListener('click', function () {
                            console.log(selectedNumberOfExtras);

                            stripe.redirectToCheckout({
                                lineItems: [{ price: stripeCheckoutPriceCode.mediumBaseMonthly, quantity: 1 },
                                {price: stripeCheckoutPriceCode.mediumExtraMonthly, quantity: parseInt(selectedNumberOfExtras)}],
                                mode: 'subscription',
                                successUrl: window.location.protocol + '//xiaotian35.com/subscription/success',
                                cancelUrl: window.location.protocol + '//youli-2021-relaunch.webflow.io/pricing-subscription'
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
                        checkoutButton.addEventListener('click', function () {
                            console.log(selectedNumberOfExtras);

                            stripe.redirectToCheckout({
                                lineItems: [{ price: stripeCheckoutPriceCode.mediumBaseMonthly, quantity: 1 }],
                                mode: 'subscription',
                                successUrl: window.location.protocol + '//xiaotian35.com/subscription/success',
                                cancelUrl: window.location.protocol + '//youli-2021-relaunch.webflow.io/pricing-subscription'
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
                        checkoutButton.addEventListener('click', function () {
                            console.log(selectedNumberOfExtras);

                            stripe.redirectToCheckout({
                                lineItems: [{ price: stripeCheckoutPriceCode.largeBaseMonthly, quantity: 1 },
                                {price: stripeCheckoutPriceCode.largeExtraMonthly, quantity: parseInt(selectedNumberOfExtras)}],
                                mode: 'subscription',
                                successUrl: window.location.protocol + '//xiaotian35.com/subscription/success',
                                cancelUrl: window.location.protocol + '//youli-2021-relaunch.webflow.io/pricing-subscription'
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
                        checkoutButton.addEventListener('click', function () {
                            console.log(selectedNumberOfExtras);

                            stripe.redirectToCheckout({
                                lineItems: [{ price: stripeCheckoutPriceCode.largeBaseMonthly, quantity: 1 }],
                                mode: 'subscription',
                                successUrl: window.location.protocol + '//xiaotian35.com/subscription/success',
                                cancelUrl: window.location.protocol + '//youli-2021-relaunch.webflow.io/pricing-subscription'
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
    //             allowedCountries: ['US', 'CA', 'AU', 'CN'],
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